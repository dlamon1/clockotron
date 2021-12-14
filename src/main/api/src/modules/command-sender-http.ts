import axios from 'axios'
import querystring from 'querystring'

import ConnectionHTTP from './connection-http'

import { vMixApiFunctionCommand } from '../types/api-command'

//
export class CommandSenderHTTP {
    protected onError: Function
    protected onSuccess: Function

    protected _connection!: ConnectionHTTP

    constructor(connection: ConnectionHTTP, onSuccess: Function, onError: Function) {
        if (!connection) {
            throw new Error('No connection provided')
        }
        this.setConnection(connection)

        this.onError = onError
        this.onSuccess = onSuccess
    }

    // Prepare promise
    protected preparePromise(commands: vMixApiFunctionCommand[]) {

        // If only one command were coded - send via get request
        if (!Array.isArray(commands)) {
            const command = commands

            return axios.get(this._connection.apiUrl(), { params: command })
        }

        // If multiple commands - send via POST request

        // Manipulate commands for being sent in POST request
        const commandsMap = commands.map(command => {
            return querystring.stringify(command)
        })

        const data = {
            Function: 'ScriptStartDynamic',
            Value: commandsMap.join("\n\r")
        }

        const dataString = querystring.stringify(data)

        return axios.post(this._connection.apiUrl(), dataString)
    }

    /**
     * Set the vMix connection used to know the endpoint for the vMix instance
     * @param {Connection} connection 
     */
    setConnection(connection: ConnectionHTTP) {
        this._connection = connection
    }

    send(commands: vMixApiFunctionCommand[], onSuccess: Function, onError: Function) {

        const promise = this.preparePromise(commands)

        promise
            .then((response: any) => {
                this.onSuccess && this.onSuccess(response)
                onSuccess && onSuccess(response)
            })
            .catch((error: any) => {
                this.onError && this.onError(error)
                onError && onError(error)
            })

        return promise
    }
}

export default CommandSenderHTTP
