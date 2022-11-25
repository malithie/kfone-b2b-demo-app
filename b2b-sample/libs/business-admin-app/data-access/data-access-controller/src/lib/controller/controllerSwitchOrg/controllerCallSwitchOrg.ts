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

import { commonControllerCall } from "@b2bsample/shared/data-access/data-access-common-api-util";
import { getHostedUrl } from "@b2bsample/business-admin-app/util/util-application-config-util";

/**
 * call `getManagementAPIServerBaseUrl()/o/<subOrgId>/scim2/Users/<userId>` get the user details
 * 
 * @param session - session object
 * 
 * @returns all applications details, if not possible returns `null`
 */
export async function controllerCallSwitchOrg(subOrgId: any, accessToken: string) {
    const data = await commonControllerCall(`${getHostedUrl()}/api/settings/switchOrg`,
        null,
        {
            accessToken: accessToken,
            subOrgId: subOrgId
        },
        true
    );

    return data;
}
