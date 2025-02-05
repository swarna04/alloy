/*
Copyright 2023 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/
import { ClientFunction, t } from "testcafe";
import createNetworkLogger from "../../helpers/networkLogger";
import createFixture from "../../helpers/createFixture";
import {
  compose,
  orgMainConfigMain,
  debugEnabled,
  thirdPartyCookiesDisabled,
  ajoConfigForStage
} from "../../helpers/constants/configParts";
import getResponseBody from "../../helpers/networkLogger/getResponseBody";
import createResponse from "../../helpers/createResponse";
import { TEST_PAGE as TEST_PAGE_URL } from "../../helpers/constants/url";
import createAlloyProxy from "../../helpers/createAlloyProxy";

const PAGE_WIDE_SCOPE = "__view__";
const AJO_TEST_SURFACE = "web://alloyio.com/functional-test/testPage.html";

const networkLogger = createNetworkLogger();
const config = compose(
  orgMainConfigMain,
  ajoConfigForStage,
  debugEnabled,
  thirdPartyCookiesDisabled
);

createFixture({
  title: "C7494472: AJO offers should be delivered",
  url: `${TEST_PAGE_URL}?test=C7494472`,
  requestHooks: [networkLogger.edgeEndpointLogs]
});

test.meta({
  ID: "C7494472",
  SEVERITY: "P0",
  TEST_RUN: "Regression"
});

const extractDecisionsMeta = payload => {
  return payload.map(decision => {
    const { id, scope, scopeDetails } = decision;
    return { id, scope, scopeDetails };
  });
};

const getHeaderTextContent = ClientFunction(
  () => document.querySelectorAll("body > h1")[0].innerText
);

test("Test C7494472: AJO offers should be delivered", async () => {
  const alloy = createAlloyProxy();
  await alloy.configure(config);
  const eventResult = await alloy.sendEvent({ renderDecisions: true });

  await t.expect(networkLogger.edgeEndpointLogs.requests.length).eql(2);

  const sendEventRequest = networkLogger.edgeEndpointLogs.requests[0];
  const requestBody = JSON.parse(sendEventRequest.request.body);
  const personalizationSchemas =
    requestBody.events[0].query.personalization.schemas;

  await t
    .expect(requestBody.events[0].query.personalization.decisionScopes)
    .eql([PAGE_WIDE_SCOPE]);

  await t
    .expect(requestBody.events[0].query.personalization.surfaces)
    .eql([AJO_TEST_SURFACE]);

  const result = [
    "https://ns.adobe.com/personalization/default-content-item",
    "https://ns.adobe.com/personalization/dom-action",
    "https://ns.adobe.com/personalization/html-content-item",
    "https://ns.adobe.com/personalization/json-content-item",
    "https://ns.adobe.com/personalization/redirect-item"
  ].every(schema => personalizationSchemas.includes(schema));

  await t.expect(result).eql(true);

  const response = JSON.parse(
    getResponseBody(networkLogger.edgeEndpointLogs.requests[0])
  );
  const personalizationPayload = createResponse({
    content: response
  }).getPayloadsByType("personalization:decisions");

  const testSurfacePayload = personalizationPayload.filter(
    payload => payload.scope === AJO_TEST_SURFACE
  )[0];

  await t.expect(testSurfacePayload.items.length).eql(1);
  await t.expect(testSurfacePayload.items[0].data.content).eql("Welcome AJO!");

  await t.expect(getHeaderTextContent()).eql("Welcome AJO!");

  await t.expect(eventResult.propositions[0].renderAttempted).eql(true);

  const notificationPayload = extractDecisionsMeta(personalizationPayload);

  const sendNotificationRequest = networkLogger.edgeEndpointLogs.requests[1];
  const notificationRequestBody = JSON.parse(
    sendNotificationRequest.request.body
  );

  await t
    .expect(notificationRequestBody.events[0].xdm.eventType)
    .eql("decisioning.propositionDisplay");
  await t
    .expect(
      // eslint-disable-next-line no-underscore-dangle
      notificationRequestBody.events[0].xdm._experience.decisioning.propositions
    )
    .eql(notificationPayload);
});
