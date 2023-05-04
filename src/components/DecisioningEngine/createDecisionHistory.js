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
import { createRestoreStorage, createSaveStorage } from "./utils";

const STORAGE_KEY = "history";
export default ({ storage }) => {
  const restore = createRestoreStorage(storage, STORAGE_KEY);
  const save = createSaveStorage(storage, STORAGE_KEY);

  const history = restore({});

  const recordDecision = id => {
    if (!history[id]) {
      history[id] = {};
    }

    if (typeof history[id].timestamp !== "number") {
      history[id].timestamp = new Date().getTime();
      save(history);
    }
    return history[id];
  };

  return { recordDecision };
};
