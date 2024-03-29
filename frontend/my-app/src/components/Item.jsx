import React from "react"
import { Link } from "react-router-dom"

const Item = ({ games }) => {
  const generateRandomPrice = () => {
    return Math.floor(Math.random() * 100)
  }

  return (
    <Link className='h-1/3' to={`/detalle/${games.id}`}>
      <div className='m-2 hover:shadow-red-600 mx-1 w-48 hover:bg-red-900 bg-slate-900 rounded-xl shadow-xl overflow-hidden max-w-2xl sm:w-96 h-72'>
        <div className='d-flex sm:flex h-full'>
          <div className='shrink-0 h-full'>
            <img
              className='object-cover h-full w-48 object-cover'
              src={games.background_image}
              alt='portada'
            />
          </div>
          <div className='p-1 h-40 sm:p-2 sm:text-2xl'>
            <div className='text-lg sm:text-2xl text-center mb-1 w-full  text-violet-600'>
              {games.name}
            </div>
            <div className=' text-white mb-3'> Disponibles: {games.stock}</div>
            <div className='text-4xl text-center text-orange-600'>
              {" "}
              $ {generateRandomPrice()}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Item
