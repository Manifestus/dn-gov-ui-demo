import { Box } from '@mui/material'
import React, { FC } from 'react'
import { Houses } from 'src/types/house'
import { HouseCard } from './house-card';

interface IProps {
    fusedData: Houses[];
}

/**
* @author
* @function @HouseList
**/

export const HouseList:FC<IProps> = (props) => {

  return (
    <Box
    sx={{
      display: 'grid',
      gap: 3,
      gridTemplateColumns: 'repeat(3, 1fr)'
    }}
  >
    {props.fusedData?.map((house, index) => (
        <HouseCard house={house} key={index}/>
    ))}
  </Box>
   )
 }
