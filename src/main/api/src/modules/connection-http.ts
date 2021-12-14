import axios from 'axios'

// Exceptions
import ApiUrlError from '../exceptions/api-url-error'

/**
 * Connection for vMix API via HTTP
 * 
 * vMix HTTP Web API
 * 
 * https://www.vmix.com/help24/DeveloperAPI.html
 */
export class ConnectionHTTP {
    protected host: string
    protected port: number

    constructor(host: string = 'localhost', port: number = 8088) {

        // Validate host and port
        if (!host || host.length < 3) {
            throw new ApiUrlError('Invalid host provided')
        }
        if (!port || port < 80 || port > 99999) {
            throw new ApiUrlError('Invalid port provided')
        }

        // Set params
        this.host = host
        this.port = port
    }

    // Public functions
    webcontrollerUrl(): string {
        return `http://${this.host}:${this.port}`
    }

    apiUrl(): string {
        return `${this.webcontrollerUrl()}/api`
    }

    testConnection() {
        return axios.get(this.webcontrollerUrl(), { timeout: 500 })
    }
}

export default ConnectionHTTP
