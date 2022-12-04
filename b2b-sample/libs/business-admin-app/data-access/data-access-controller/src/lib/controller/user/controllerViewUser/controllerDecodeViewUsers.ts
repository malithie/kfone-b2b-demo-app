/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { commonControllerDecode } from "@b2bsample/shared/data-access/data-access-common-api-util";
import { InternalUser, User, decodeUser } from "@b2bsample/shared/data-access/data-access-common-models-util";
import { Session } from "next-auth";
import { controllerCallViewUsers } from "./controllerCallViewUsers";

/**
 * 
 * @param session - session object
 
 * @returns details of all users
 */
export async function controllerDecodeViewUsers(session: Session) {

    const usersData = (
        await commonControllerDecode(() => controllerCallViewUsers(session), null) as Record<string, unknown>);

    if (usersData) {
        const usersReturn: InternalUser[] = [];

        (usersData["Resources"] as User[]).map((user: User) => {
            const userDetails = decodeUser(user);

            if (userDetails) {
                usersReturn.push(userDetails);
            }
        });

        return usersReturn;
    }

    return usersData;

}

export default controllerDecodeViewUsers;
