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

import callPatchApplicationAuthSteps from "../../../apiCall/settings/application/callPatchApplicationAuthSteps";
import {
    ENTERPRISE_AUTHENTICATOR_ID, ENTERPRISE_ID, FACEBOOK_AUTHENTICATOR_ID, FACEBOOK_ID,
    GOOGLE_AUTHENTICATOR_ID, GOOGLE_ID
} from "../../../util/common/common";

function getAuthenticationSequenceModel(template) {
    let authenticationSequenceModel = template.authenticationSequence;
    delete authenticationSequenceModel.requestPathAuthenticators;

    return authenticationSequenceModel;
}

function getAuthenticatorId(templateId) {
    switch (templateId) {
        case GOOGLE_ID:

            return GOOGLE_AUTHENTICATOR_ID;
        case FACEBOOK_ID:

            return FACEBOOK_AUTHENTICATOR_ID;
        case ENTERPRISE_ID:

            return ENTERPRISE_AUTHENTICATOR_ID;
        default:

            return null;
    }
}

function getAuthenticatorBody(idpTempleteId, idpName) {

    return {
        "idp": idpName,
        "authenticator": getAuthenticatorId(idpTempleteId)
    }
}

function addRemoveAuthSequence(template, idpTempleteId, idpName, method) {

    let authenticationSequenceModel = getAuthenticationSequenceModel(template);

    if (method) {
        authenticationSequenceModel.steps[0].options.push(getAuthenticatorBody(idpTempleteId, idpName));
        return authenticationSequenceModel;
    } else {

        for (let j = authenticationSequenceModel.steps.length - 1; j >= 0; j--) {
            let step = authenticationSequenceModel.steps[j];
            for (let i = 0; i < step.options.length; i++) {
                if (step.options[i].idp === idpName) {
                    step.options.splice(i, 1);
                    if (step.options.length === 0) {
                        authenticationSequenceModel.steps(j, 1);
                    }
                    break;
                }
            }
        }

        return authenticationSequenceModel;
    }
}

export default async function decodePatchApplicationAuthSteps(session, template, idpDetails, method) {

    let applicationId = template.id;
    let idpName = idpDetails.name;
    let idpTempleteId = idpDetails.templateId;

    let authenticationSequenceModel = {
        "authenticationSequence": addRemoveAuthSequence(template, idpTempleteId, idpName, method)
    }

    try {
        const res = await callPatchApplicationAuthSteps(session, applicationId, authenticationSequenceModel);

        return true;
    } catch (err) {

        return null;
    }
}
