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

import { Role } from "@b2bsample/business-admin-app/data-access/data-access-common-models-util";
import { Session } from "next-auth";
import React from "react";
import { FlexboxGrid, PanelGroup, Table } from "rsuite";
import RoleItem from "./roleItem/roleItem";
import styles from "../../../../../../styles/idp.module.css";

interface RolesListProps {
    session : Session
    rolesList : Role[]
}

/**
 * 
 * @param prop - `session`, `roleList`
 *
 * @returns List of all the roles in an organization.
 */
export default function RolesList(props: RolesListProps) {

    const { session, rolesList } = props;
    
    const { Column, HeaderCell, Cell } = Table;

    return (
        <FlexboxGrid
            style={ { height: "60vh", marginTop: "24px", width: "100%" } }
            justify="start"
            align="top" >
            <div className={ styles.idp__list }>
                <PanelGroup accordion>
                    <Table
                        height={ 900 }
                        data={ rolesList }
                    >
                        <Column width={ 200 } align="center">
                            <HeaderCell><h6>Display Name</h6></HeaderCell>
                            <Cell dataKey="displayName" />
                        </Column>


                        {/* <Column width={ 100 } flexGrow={ 1 } align="center" fixed="right"> */}
                        <Column width={ 100 } align="center" flexGrow={ 2 } >
                            <HeaderCell><h6>Assign</h6></HeaderCell>

                            <Cell>
                                { rowData => (
                                    <span>
                                        <a
                                            onClick={ () => null }
                                            style={ { cursor: "pointer" } }>
                                            Edit
                                        </a>
                                    </span>
                                ) }
                            </Cell>
                        </Column>

                    </Table>
                    {/* { rolesList.map((role) => (
                        <RoleItem
                            key={ role.id }
                            session={ session }
                            role={ role }
                            id={ role.id }
                            roleUri={ role.meta.location } />
                    )) } */}
                </PanelGroup>
            </div>
        </FlexboxGrid >
    );
}
