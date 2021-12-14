//
import ConnectionTCP from './modules/connection-tcp'

import ConnectionHTTP from './modules/connection-http'
import CommandSenderHTTP from './modules/command-sender-http'

// Alias
const Connection = ConnectionTCP

export default {
	Connection, // Alias for ConnectionTCP
	ConnectionTCP,

	// Legacy classes: 
	// HTTP connection and command-sender
	CommandSenderHTTP,
	ConnectionHTTP,
}

// Also expose modules as separate modules to be imported
export {
	ConnectionTCP,
	ConnectionTCP as Connection
} from './modules/connection-tcp'
export { ConnectionHTTP } from './modules/connection-http'
export { CommandSenderHTTP } from './modules/command-sender-http'

