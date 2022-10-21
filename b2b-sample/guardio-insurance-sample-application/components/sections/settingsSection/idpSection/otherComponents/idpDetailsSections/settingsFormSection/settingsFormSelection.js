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

import CopyIcon from "@rsuite/icons/Copy";
import React from "react";
import { Field } from "react-final-form";
import { InputGroup, useToaster } from "rsuite";
import FormSuite from "rsuite/Form";
import { selectedTemplateBaesedonTemplateId } from "../../../../../../../util/util/applicationUtil/applicationUtil";
import { copyTheTextToClipboard } from "../../../../../../../util/util/common/common";
import { infoTypeDialog } from "../../../../../../common/dialog";
import HelperText from "../../../../../../common/helperText";

/**
 * 
 * @param prop - templateId, federatedAuthenticators (federatedAuthenticators as a list)
 * @returns Component of the settings section of the idp interface
 */
export default function SettingsFormSelection(prop) {

    const { templateId, federatedAuthenticators } = prop;

    const toaster = useToaster();

    const propList = () => {
        let selectedTemplate = selectedTemplateBaesedonTemplateId(templateId);

        if (selectedTemplate) {
            return selectedTemplate.idp.federatedAuthenticators.authenticators[0].properties;
        } else {
            return null;
        }
    };

    const selectedValue = (key) => {

        let keyFederatedAuthenticator = federatedAuthenticators.filter((obj) => obj.key === key)[0];

        return keyFederatedAuthenticator ? keyFederatedAuthenticator.value : "";
    };

    const copyValueToClipboard = (text) => {
        copyTheTextToClipboard(text);
        infoTypeDialog(toaster, "Text copied to clipboard");
    };

    return (

        propList()
            ? propList().map((property) => {
                return (
                    <Field
                        key={ property.key }
                        name={ property.key }
                        initialValue={ selectedValue(property.key) }
                        render={ ( { input, meta } ) => (
                            <FormSuite.Group controlId={ property.key }>
                                <FormSuite.ControlLabel>{ property.displayName }</FormSuite.ControlLabel>
                                <InputGroup inside style={ { width: "100%" } }>

                                    <FormSuite.Control
                                        readOnly={ property.readOnly ? property.readOnly : false }
                                        { ...input }
                                    />

                                    {
                                        property.readOnly
                                            ? (<InputGroup.Button
                                                onClick={ () => copyValueToClipboard(selectedValue(property.key)) }>
                                                <CopyIcon />
                                            </InputGroup.Button>)
                                            : null
                                    }

                                </InputGroup>
                                <HelperText
                                    text={ property.description } />

                                { meta.error && meta.touched && (<FormSuite.ErrorMessage show={ true } >
                                    { meta.error }
                                </FormSuite.ErrorMessage>) }

                            </FormSuite.Group>
                        ) }
                    />
                );
            })
            : <p>Access the console to edit this identity provider</p>

    );
}

