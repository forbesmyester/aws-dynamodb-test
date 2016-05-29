/// <reference path="../typings/main.d.ts" />
/// <reference path="../my-externals/definitely-typed-aws-sdk/aws-sdk/aws-sdk.d.ts" />

import * as T from "./types";
import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'us-east-1' });

function awsPromiseWrap(ctx, func, ...params): Promise<any> {

    let funcName = params.pop();
    return new Promise((resolve, reject) => {
        func.apply(ctx, params.concat([(err, data) => {
            console.dir({
                called: funcName,
                err: err,
                data: data
            });
            if (err) { return reject(err); }
            resolve(data);
        }]));
    });
}

const TABLE_NAME = 'KeyboardwritescodeAdtUser';

export function addSomething(): Promise<any> {
    let dc = new AWS.DynamoDB.DocumentClient({});

    function get() {
        let dcGet = <AWS.DynamoDB.GetParam>{
            TableName: TABLE_NAME,
            Key: { userId: 'abc123', email: 'abc123@abc123.com' }
        };
        return awsPromiseWrap(dc, dc.get, dcGet, 'get');
    }

    function put() {
        let dcPut = <AWS.DynamoDB.PutParam>{
            TableName: TABLE_NAME,
            Item: {
                userId: 'abc123',
                email: 'abc123@abc123.com',
                firstName: 'Matt',
                lastName: 'Forrester the ' + new Date().getTime()
            }
        };
        return awsPromiseWrap(dc, dc.put, dcPut, 'put');
    }

    function del() {
        let dcDelete = <AWS.DynamoDB.DeleteParam>{
            TableName: TABLE_NAME,
            Key: {
                userId: 'abc123',
                email: 'abc123@abc123.com'
            }
        };
        return awsPromiseWrap(dc, dc.delete, dcDelete, 'del');
    }

    function update() {
        let dcUpdate = <AWS.DynamoDB.UpdateParam>{
            TableName: TABLE_NAME,
            Key: {
                userId: 'abc123',
                email: 'abc123@abc123.com'
            },
            AttributeUpdates: {
                age: {
                    Action: 'PUT',
                    Value: 35
                }
            }
        };
        return awsPromiseWrap(dc, dc.update, dcUpdate, 'upd');
    }

    function scan() {
        let dcScan = <AWS.DynamoDB.ScanParam>{
            TableName: TABLE_NAME,
            KeyConditions: {
                age: {
                    ComparisonOperator: 'EQ',
                    AttributeValueList: [35]
                }
            }
        };
        return awsPromiseWrap(dc, dc.scan, dcScan, 'scan');
    }

    function qry() {
        let dcQuery = <AWS.DynamoDB.QueryParam>{
            TableName: TABLE_NAME,
            KeyConditions: {
                userId: {
                    ComparisonOperator: 'EQ',
                    AttributeValueList: ['abc123']
                }
            }
        };
        return awsPromiseWrap(dc, dc.query, dcQuery, 'qry');
    }

    return del().then(qry).then(put).then(get).then(update).then(qry).then(scan);

}
