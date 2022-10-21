/*
 * Copyright (c) 2022 WSO2 LLC. (https://www.wso2.com).
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *http://www.apache.org/licenses/LICENSE-2.
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import config from "../../../config.json";
import callSwitchOrg from "../../apiCall/settings/callSwitchOrg";
import { commonDecode } from "../../util/apiUtil/commonDecode";

function getSubOrgId(token) {
    
    try {

        return config.SAMPLE_ORGS[0].id;
    } catch (error) {

        return token.user.federated_org;
    }

}

export default async function decodeSwitchOrg(token) {

    const subOrgId = getSubOrgId(token);
    const accessToken = token.accessToken;

    try {
        const orgSession = await commonDecode(()=> callSwitchOrg(subOrgId, accessToken), null);

        return orgSession;
    } catch (err) {

        return null;
    }
}
