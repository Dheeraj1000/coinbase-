import Header from '../components/Header'
import styled from 'styled-components'
import Main from '../components/Main'
import Sidebar from '../components/Sidebar'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'
import { useEffect, useState } from 'react'

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_KEY,
    //ethers.getDefaultProvider('https://rpc-mumbai.maticvigil.com/v1/7da6ec7ad527d80ce6f12f32203d8f68d30aab16')
    //ethers.getDefaultProvider('https://goerli.infura.io/v3/')
    ethers.getDefaultProvider('https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161')

  ),
)

const Dashboard = ({ address }) => {
  const [sanityTokens, setSanityTokens] = useState([])
  const [twTokens, setTwTokens] = useState([])

  useEffect(() => {
    const getSanityAndThirdWebTokens = async () => {
        const coins = await fetch("https://5z5rwjl7.api.sanity.io/v2021-10-21/data/query/production?query=*%5B_type%3D%3D'coins'%5D%7B%0A%20%20name%2C%0A%20%20indPrice%2C%0A%20%20contractAddress%2C%0A%20%20%20%20symbol%2C%0A%20%20%20%20logo%0A%7D")
        const sanityTokens = (await coins.json()).result
        setSanityTokens(sanityTokens)

        setTwTokens(
          sanityTokens.map(token => sdk.getTokenModule(token.contractAddress))
        )
    }
      getSanityAndThirdWebTokens()
  }, [])
  
  //console.log('Sanity', sanityTokens);
  //console.log('Thirdweb', twTokens);


  return (
    <Wrapper>
      <Sidebar />
      <MainContainer>
        <Header
         twTokens={twTokens}
         sanityTokens={sanityTokens}
         walletAddress={address}
        />
        <Main
         twTokens={twTokens}
         sanityTokens={sanityTokens}
         walletAddress={address}
        />
      </MainContainer>
    </Wrapper>
  )
}

export default Dashboard

export async function getServerSideProps(context) {}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: #0a0b0d;
  color: white;
`

const MainContainer = styled.div`
  flex: 1;
`
