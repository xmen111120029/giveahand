import {
  useAddress,
  useContract,
  useContractEvents,
  useContractWrite,
  useTransferToken,
} from '@thirdweb-dev/react'

export default function ApprovalToken() {
  const address = useAddress()
  const contractAddress = '0x905BAe91569339fa21de6aaba9B0564CeBd9F7F4'
  const { contract } = useContract(contractAddress)
  const { mutateAsync: approve, isLoading } = useContractWrite(
    contract,
    'approve'
  )
  const { mutate: transferTokens } = useTransferToken(contract)
  const { data: event } = useContractEvents(contract, 'Approval')
  console.log(event)
  if (isLoading) return <p>Loading...</p>
  const appr = async () => {
    try {
      const data = await approve({ args: [address, 1] })
      console.info('contract call successs', data)
    } catch (err) {
      console.error('contract call failure', err)
    }
  }
  function transfer() {
    transferTokens({
      to: '0x9101E40883008206F7adCD4B6c3B69B0d74854f6',
      amount: document.getElementById('total').value,
    })
  }
  return (
    <div>
      <button onClick={appr}>Approve</button>
      <button onClick={transfer}>Send</button>
      <input type="number" id="total" />
    </div>
  )
}
