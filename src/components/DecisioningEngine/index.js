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
import { noop } from "../../utils";
import createOnResponseHandler from "./createOnResponseHandler";
import createDecisionProvider from "./createDecisionProvider";
import createApplyResponse from "./createApplyResponse";
import createEventRegistry from "./createEventRegistry";
import createContextProvider from "./createContextProvider";

const createDecisioningEngine = () => {
  const eventRegistry = createEventRegistry();
  let applyResponse = createApplyResponse();
  const decisionProvider = createDecisionProvider();
  const contextProvider = createContextProvider({ eventRegistry });

  return {
    lifecycle: {
      onComponentsRegistered(tools) {
        applyResponse = createApplyResponse(tools.lifecycle);
      },
      onBeforeEvent({
        event,
        renderDecisions,
        decisionContext = {},
        onResponse = noop
      }) {
        if (renderDecisions) {
          onResponse(
            createOnResponseHandler({
              decisionProvider,
              applyResponse,
              event,
              decisionContext: contextProvider.getContext(decisionContext)
            })
          );
          return;
        }

        eventRegistry.rememberEvent(event);
      }
    },
    commands: {
      renderDecisions: {
        run: decisionContext =>
          applyResponse({
            propositions: decisionProvider.evaluate(
              contextProvider.getContext(decisionContext)
            )
          })
      }
    }
  };
};

createDecisioningEngine.namespace = "DecisioningEngine";
export default createDecisioningEngine;
