import createSubscribeMessageFeed from "../../../../../src/components/Personalization/createSubscribeMessageFeed";
import { MESSAGE_FEED_ITEM } from "../../../../../src/components/Personalization/constants/schema";

describe("Personalization:subscribeMessageFeed", () => {
  let collect;
  let subscribeMessageFeed;

  const PROPOSITIONS = [
    {
      id: "2e4c7b28-b3e7-4d5b-ae6a-9ab0b44af87e",
      items: [
        {
          schema: "https://ns.adobe.com/personalization/dom-action",
          data: {
            selector: "HTML > BODY > DIV.offer:eq(0) > IMG:nth-of-type(1)",
            type: "setAttribute",
            content: {
              src: "img/demo-marketing-offer1-exp-A.png"
            },
            prehidingSelector:
              "HTML > BODY > DIV:nth-of-type(2) > IMG:nth-of-type(1)"
          },
          id: "79129ecf-6430-4fbd-955a-b4f1dfdaa6fe",
          qualifiedDate: 1683042673387,
          displayedDate: 1683042673395
        },
        {
          schema: "https://ns.adobe.com/personalization/dom-action",
          data: {
            selector: "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)",
            type: "setHtml",
            content: "Hello Treatment A!",
            prehidingSelector:
              "HTML > BODY > DIV:nth-of-type(1) > H1:nth-of-type(1)"
          },
          id: "10da709c-aa1a-40e5-84dd-966e2e8a1d5f",
          qualifiedDate: 1683042673387,
          displayedDate: 1683042673395
        }
      ],
      scope: "web://mywebsite.com/feed"
    },
    {
      id: "1a3d874f-39ee-4310-bfa9-6559a10041a4",
      items: [
        {
          schema: MESSAGE_FEED_ITEM,
          data: {
            expiryDate: 1712190456,
            publishedDate: 1677752640000,
            meta: {
              feedName: "Winter Promo",
              surface: "web://mywebsite.com/feed"
            },
            parameters: {},
            content: {
              imageUrl: "img/lumon.png",
              actionTitle: "Shop the sale!",
              actionUrl: "https://luma.com/sale",
              body: "a handshake is available upon request.",
              title: "Welcome to Lumon!"
            },
            contentType: "application/json"
          },
          id: "a48ca420-faea-467e-989a-5d179d9f562d",
          qualifiedDate: 1683042628064,
          displayedDate: 1683042628070
        },
        {
          schema: MESSAGE_FEED_ITEM,
          data: {
            expiryDate: 1712190456,
            publishedDate: 1677839040000,

            meta: {
              feedName: "Winter Promo",
              surface: "web://mywebsite.com/feed"
            },
            parameters: {},
            content: {
              imageUrl: "img/achievement.png",
              actionTitle: "Shop the sale!",
              actionUrl: "https://luma.com/sale",
              body: "Great job, you completed your profile.",
              title: "Achievement Unlocked!"
            },
            contentType: "application/json"
          },
          id: "b7173290-588f-40c6-a05c-43ed5ec08b28",
          qualifiedDate: 1683042628064,
          displayedDate: 1683042628070
        }
      ],
      scope: "web://mywebsite.com/feed"
    },
    {
      id: "1ae11bc5-96dc-41c7-8f71-157c57a5290e",
      items: [
        {
          schema: MESSAGE_FEED_ITEM,
          data: {
            expiryDate: 1712190456,
            publishedDate: 1678098240000,
            meta: {
              feedName: "Winter Promo",
              surface: "web://mywebsite.com/feed"
            },
            parameters: {},
            content: {
              imageUrl: "img/twitter.png",
              actionTitle: "Shop the sale!",
              actionUrl: "https://luma.com/sale",
              body: "Posting on social media helps us spread the word.",
              title: "Thanks for sharing!"
            },
            contentType: "application/json"
          },
          id: "cfcb1af7-7bc2-45b2-a86a-0aa93fe69ce7",
          qualifiedDate: 1683042658312,
          displayedDate: 1683042658316
        }
      ],
      scope: "web://mywebsite.com/feed",
      scopeDetails: {
        id: "1ae11bc5-96dc-41c7-8f71-157c57a5290e",
        scope: "web://mywebsite.com/feed",
        scopeDetails: {
          decisionProvider: "AJO",
          characteristics: {
            eventToken:
              "eyJtZXNzYWdlRXhlY3V0aW9uIjp7Im1lc3NhZ2VFeGVjdXRpb25JRCI6Ik5BIiwibWVzc2FnZUlEIjoiMDJjNzdlYTgtN2MwZS00ZDMzLTgwOTAtNGE1YmZkM2Q3NTAzIiwibWVzc2FnZVR5cGUiOiJtYXJrZXRpbmciLCJjYW1wYWlnbklEIjoiMzlhZThkNGItYjU1ZS00M2RjLWExNDMtNzdmNTAxOTViNDg3IiwiY2FtcGFpZ25WZXJzaW9uSUQiOiJiZDg1ZDllOC0yMDM3LTQyMmYtYjZkMi0zOTU3YzkwNTU5ZDMiLCJjYW1wYWlnbkFjdGlvbklEIjoiYjQ3ZmRlOGItNTdjMS00YmJlLWFlMjItNjRkNWI3ODJkMTgzIiwibWVzc2FnZVB1YmxpY2F0aW9uSUQiOiJhZTUyY2VkOC0yMDBjLTQ5N2UtODc4Ny1lZjljZmMxNzgyMTUifSwibWVzc2FnZVByb2ZpbGUiOnsiY2hhbm5lbCI6eyJfaWQiOiJodHRwczovL25zLmFkb2JlLmNvbS94ZG0vY2hhbm5lbHMvd2ViIiwiX3R5cGUiOiJodHRwczovL25zLmFkb2JlLmNvbS94ZG0vY2hhbm5lbC10eXBlcy93ZWIifSwibWVzc2FnZVByb2ZpbGVJRCI6ImY1Y2Q5OTk1LTZiNDQtNDIyMS05YWI3LTViNTMzOGQ1ZjE5MyJ9fQ=="
          },
          strategies: [
            {
              strategyID: "3VQe3oIqiYq2RAsYzmDTSf",
              treatmentID: "yu7rkogezumca7i0i44v"
            }
          ],
          activity: {
            id:
              "39ae8d4b-b55e-43dc-a143-77f50195b487#b47fde8b-57c1-4bbe-ae22-64d5b782d183"
          },
          correlationID: "02c77ea8-7c0e-4d33-8090-4a5bfd3d7503"
        }
      }
    },
    {
      id: "d1f7d411-a549-47bc-a4d8-c8e638b0a46b",
      items: [
        {
          schema: MESSAGE_FEED_ITEM,
          data: {
            expiryDate: 1712190456,
            publishedDate: 1678184640000,
            meta: {
              feedName: "Winter Promo",
              surface: "web://mywebsite.com/feed"
            },
            parameters: {},
            content: {
              imageUrl: "img/gold-coin.jpg",
              actionTitle: "Shop the sale!",
              actionUrl: "https://luma.com/sale",
              body: "Now you're ready to earn!",
              title: "Funds deposited!"
            },
            contentType: "application/json"
          },
          id: "0263e171-fa32-4c7a-9611-36b28137a81d",
          qualifiedDate: 1683042653905,
          displayedDate: 1683042653909
        }
      ],
      scope: "web://mywebsite.com/feed"
    }
  ];

  beforeEach(() => {
    collect = jasmine.createSpy().and.returnValue(Promise.resolve());
    subscribeMessageFeed = createSubscribeMessageFeed({ collect });
  });

  it("has a command defined", () => {
    const { command } = subscribeMessageFeed;

    expect(command).toEqual({
      optionsValidator: jasmine.any(Function),
      run: jasmine.any(Function)
    });
  });

  it("calls the callback with list of items", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    // register a subscription.  equivalent to alloy("subscribeMessageFeed", {surface, callback})
    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);
    expect(callback).toHaveBeenCalledOnceWith({
      items: [
        jasmine.objectContaining({
          imageUrl: "img/twitter.png",
          actionTitle: "Shop the sale!",
          actionUrl: "https://luma.com/sale",
          publishedDate: 1678098240000,
          body: "Posting on social media helps us spread the word.",
          title: "Thanks for sharing!",
          qualifiedDate: 1683042658312,
          displayedDate: 1683042658316
        }),
        jasmine.objectContaining({
          imageUrl: "img/gold-coin.jpg",
          actionTitle: "Shop the sale!",
          actionUrl: "https://luma.com/sale",
          publishedDate: 1678184640000,
          body: "Now you're ready to earn!",
          title: "Funds deposited!",
          qualifiedDate: 1683042653905,
          displayedDate: 1683042653909
        }),
        jasmine.objectContaining({
          imageUrl: "img/achievement.png",
          actionTitle: "Shop the sale!",
          actionUrl: "https://luma.com/sale",
          publishedDate: 1677839040000,
          body: "Great job, you completed your profile.",
          title: "Achievement Unlocked!",
          qualifiedDate: 1683042628064,
          displayedDate: 1683042628070
        }),
        jasmine.objectContaining({
          imageUrl: "img/lumon.png",
          actionTitle: "Shop the sale!",
          actionUrl: "https://luma.com/sale",
          publishedDate: 1677752640000,
          body: "a handshake is available upon request.",
          title: "Welcome to Lumon!",
          qualifiedDate: 1683042628064,
          displayedDate: 1683042628070
        })
      ],
      clicked: jasmine.any(Function),
      rendered: jasmine.any(Function)
    });
  });
  it("has helper methods on items", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items } = callback.calls.first().args[0];

    expect(items[0].getSurface).toEqual(jasmine.any(Function));
    expect(items[0].getAnalyticsDetail).toEqual(jasmine.any(Function));

    expect(items[0].getSurface()).toEqual("web://mywebsite.com/feed");
    expect(items[0].getAnalyticsDetail()).toEqual({
      id: "1ae11bc5-96dc-41c7-8f71-157c57a5290e",
      scope: "web://mywebsite.com/feed",
      scopeDetails: {
        id: "1ae11bc5-96dc-41c7-8f71-157c57a5290e",
        scope: "web://mywebsite.com/feed",
        scopeDetails: {
          decisionProvider: "AJO",
          characteristics: {
            eventToken:
              "eyJtZXNzYWdlRXhlY3V0aW9uIjp7Im1lc3NhZ2VFeGVjdXRpb25JRCI6Ik5BIiwibWVzc2FnZUlEIjoiMDJjNzdlYTgtN2MwZS00ZDMzLTgwOTAtNGE1YmZkM2Q3NTAzIiwibWVzc2FnZVR5cGUiOiJtYXJrZXRpbmciLCJjYW1wYWlnbklEIjoiMzlhZThkNGItYjU1ZS00M2RjLWExNDMtNzdmNTAxOTViNDg3IiwiY2FtcGFpZ25WZXJzaW9uSUQiOiJiZDg1ZDllOC0yMDM3LTQyMmYtYjZkMi0zOTU3YzkwNTU5ZDMiLCJjYW1wYWlnbkFjdGlvbklEIjoiYjQ3ZmRlOGItNTdjMS00YmJlLWFlMjItNjRkNWI3ODJkMTgzIiwibWVzc2FnZVB1YmxpY2F0aW9uSUQiOiJhZTUyY2VkOC0yMDBjLTQ5N2UtODc4Ny1lZjljZmMxNzgyMTUifSwibWVzc2FnZVByb2ZpbGUiOnsiY2hhbm5lbCI6eyJfaWQiOiJodHRwczovL25zLmFkb2JlLmNvbS94ZG0vY2hhbm5lbHMvd2ViIiwiX3R5cGUiOiJodHRwczovL25zLmFkb2JlLmNvbS94ZG0vY2hhbm5lbC10eXBlcy93ZWIifSwibWVzc2FnZVByb2ZpbGVJRCI6ImY1Y2Q5OTk1LTZiNDQtNDIyMS05YWI3LTViNTMzOGQ1ZjE5MyJ9fQ=="
          },
          strategies: [
            {
              strategyID: "3VQe3oIqiYq2RAsYzmDTSf",
              treatmentID: "yu7rkogezumca7i0i44v"
            }
          ],
          activity: {
            id:
              "39ae8d4b-b55e-43dc-a143-77f50195b487#b47fde8b-57c1-4bbe-ae22-64d5b782d183"
          },
          correlationID: "02c77ea8-7c0e-4d33-8090-4a5bfd3d7503"
        }
      }
    });
  });

  it("collects interact events", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, clicked } = callback.calls.first().args[0];

    clicked([items[0]]);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionInteract",
      documentMayUnload: true
    });
  });

  it("collects only one interact event per proposition", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, clicked } = callback.calls.first().args[0];

    clicked([items[0], items[0], items[0]]);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionInteract",
      documentMayUnload: true
    });
  });

  it("collects separately interact events for each distinct proposition", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, clicked } = callback.calls.first().args[0];

    clicked([items[0]]);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionInteract",
      documentMayUnload: true
    });

    clicked([items[0]]);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionInteract",
      documentMayUnload: true
    });

    expect(collect).toHaveBeenCalledTimes(2);
  });

  it("collects multiple interact events for distinct propositions", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, clicked } = callback.calls.first().args[0];

    clicked([items[0], items[1]]);

    expect(collect).toHaveBeenCalledOnceWith({
      decisionsMeta: [
        items[0].getAnalyticsDetail(),
        items[1].getAnalyticsDetail()
      ],
      eventType: "decisioning.propositionInteract",
      documentMayUnload: true
    });
  });

  it("collects display events", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, rendered } = callback.calls.first().args[0];

    rendered([items[0]]);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionDisplay"
    });
  });

  it("collects only one display event per proposition", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, rendered } = callback.calls.first().args[0];

    rendered([items[0]]);
    rendered([items[0], items[0]]);

    expect(collect).toHaveBeenCalledOnceWith({
      decisionsMeta: [items[0].getAnalyticsDetail()],
      eventType: "decisioning.propositionDisplay"
    });
  });

  it("collects multiple display events for distinct propositions", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, rendered } = callback.calls.first().args[0];

    rendered([items[0], items[1]]);

    expect(collect).toHaveBeenCalledOnceWith({
      decisionsMeta: [
        items[0].getAnalyticsDetail(),
        items[1].getAnalyticsDetail()
      ],
      eventType: "decisioning.propositionDisplay"
    });
  });

  it("collects display events only once per session", () => {
    const { command, refresh } = subscribeMessageFeed;

    const callback = jasmine.createSpy();

    command.run({ surface: "web://mywebsite.com/feed", callback });

    refresh(PROPOSITIONS);

    const { items, rendered } = callback.calls.first().args[0];

    rendered([items[0], items[1]]);
    rendered([items[0], items[1]]);
    rendered([items[2]]);

    expect(collect).toHaveBeenCalledTimes(2);

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [
        items[0].getAnalyticsDetail(),
        items[1].getAnalyticsDetail()
      ],
      eventType: "decisioning.propositionDisplay"
    });

    expect(collect).toHaveBeenCalledWith({
      decisionsMeta: [items[2].getAnalyticsDetail()],
      eventType: "decisioning.propositionDisplay"
    });
  });
});
