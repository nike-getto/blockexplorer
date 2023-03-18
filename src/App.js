import { Alchemy, Network } from 'alchemy-sdk'
import { useEffect, useState } from 'react'

import './App.css'

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
const settings = {
	apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
	network: Network.ETH_MAINNET,
}

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
const alchemy = new Alchemy(settings)

function App() {
	const [blockNumber, setBlockNumber] = useState()
	const [nonce, setNonce] = useState()
	const [hash, setHash] = useState()
	const [gasLimit, setGasLimit] = useState()

	useEffect(() => {
		async function getBlockNumber() {
			setBlockNumber(await alchemy.core.getBlockNumber())
		}

		getBlockNumber()

		async function getBlock() {
			const result = await alchemy.core.getBlock(blockNumber)
			setNonce(parseInt(result.nonce, 16))
			setHash(result.hash)
			setGasLimit(parseInt(result.gasLimit._hex, 16))
		}

		getBlock()
	})

	return (
		<div className='App'>
			Block Number: {blockNumber} <br />
			Nonce: {nonce} <br />
			Hash: {hash} <br />
			Gas Limit: {gasLimit} <br />
		</div>
	)
}

export default App
