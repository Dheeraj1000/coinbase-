import styled from 'styled-components'
import Coin from './Coin'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { coins } from '../static/coins'
import BalanceChart from './BalanceChart.js'
import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { ThirdwebSDK } from '@3rdweb/sdk'


const Portfolio = ({twTokens, sanityTokens, walletAddress}) => {
  const [walletBalance, setWalletBalance] = useState(0)
  //twTokens[2].balanceOf(walletAddress).then(balance => console.log(balance))
  const tokenToUSD = {}

  for(const token of sanityTokens){
    tokenToUSD[token.contractAddress] = Number(token.indPrice)
  }
  //console.table(tokenToUSD)

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const total = await Promise.all(
        twTokens.map(async token => {
          const balance = await token.balanceOf(walletAddress)
          return Number(balance.displayValue) * tokenToUSD[token.address]
        })
      )
      
      console.log('total',total)
      setWalletBalance(total.reduce((acc,curr) => acc + curr, 0))
    }

     calculateTotalBalance()
  }, [twTokens, sanityTokens])
  


    return (
      <Wrapper>
        <Content>
          <Chart>
            <div>
              <Balance>
                <BalanceTitle>Portfolio balance</BalanceTitle>
                <BalanceValue>
                  {'₹'}
                  {walletBalance.toLocaleString()}
                </BalanceValue>
              </Balance>
            </div>
            <BalanceChart />
          </Chart>
          <PortfolioTable>
            <TableItem>
              <Title>Your Assets</Title>
            </TableItem>
            <Divider />
            <Table>
              <TableItem>
                <TableRow>
                  <div style={{ flex: 3 }}>Name</div>
                  <div style={{ flex: 2 }}>Balance</div>
                  <div style={{ flex: 1 }}>Price</div>
                  <div style={{ flex: 1 }}>Allocation</div>
                  <div style={{ flex: 0, color: '#0a0b0d' }}>
                    <BsThreeDotsVertical />
                  </div>
                </TableRow>
              </TableItem>
              <Divider />
              <div>
                {coins.map(coin => (
                  <div key={coin.name}>
                    <Coin coin={coin} />
                    <Divider />
                  </div>
                ))}
              </div>
            </Table>
          </PortfolioTable>
        </Content>
      </Wrapper>
  )
}

export default Portfolio

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 100%;
`
const Content = styled.div`
  width: 100%;
  max-width: 1000px;
  padding: 2rem 1rem;
`

const Chart = styled.div`
  border: 1px solid #282b2f;
  padding: 1rem 2rem;
`

const Balance = styled.div``

const BalanceTitle = styled.div`
  color: #8a919e;
  font-size: 0.9rem;
`

const BalanceValue = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 0.5rem 0;
`

const PortfolioTable = styled.div`
  margin-top: 1rem;
  border: 1px solid #282b2f;
`

const Table = styled.div`
  width: 100%;
`

const TableRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & > th {
    text-align: left;
  }
`

const TableItem = styled.div`
  padding: 1rem 2rem;
`

const Divider = styled.div`
  border-bottom: 1px solid #282b2f;
`

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
`
