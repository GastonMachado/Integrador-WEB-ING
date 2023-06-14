import React, { useState, useEffect } from "react"
import ItemList from "./ItemList"
import LoaderPacman from "./LoaderPacman"
import { useParams } from "react-router-dom"
// import {
//     getFirestore,
//     collection,
//     getDocs,
//     query,
//     where,
// } from "firebase/firestore";

export const ItemListContainer = () => {
  const [data, setData] = useState([])
  const [cargando, setCargando] = useState(false)

  const { categoriaId } = useParams()

  const API_KEY = "2fde3eb8c54742f8aac0e1b47d38c866"
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [ordering, setOrdering] = useState("rating")
  const [search, setSearch] = useState("")

  const QUERY = `https://api.rawg.io/api/games?key=${API_KEY}&page=${page}&page_size=${pageSize}&search=${search}&ordering=${ordering}`

  const fetchingGames = () => {
    setCargando(true)
    fetch(QUERY)
      .then((response) => response.json())
      .then((data) => {
        setData(data.results)
        setCargando(false)
      })
      .catch((error) => {
        setCargando(false)
      })
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  const previousPage = () => {
    if (page === 1) return
    setPage(page - 1)
  }

  const searchGame = () => {
    setSearch(document.getElementById("searcher").value)
    setPage(1)
  }

  useEffect(() => {
    fetchingGames()
  }, [page, search])

  return cargando ? (
    <div className='d-flex inline-flex flex-wrap w-full justify-center mt-80'>
      <h1 className='text-center text-middle text-white text-3xl h-96'>
        <LoaderPacman />
      </h1>
    </div>
  ) : (
    <>
      <div className='mt-24  flex justify-center gap-2'>
        <input
          onBlur={searchGame}
          type='text'
          id='searcher'
          className='rounded mt-12 bg-white'
        />
        <button className='rounded bg-red-600 w-16 h-8 font-bold mt-12'>
          Buscar
        </button>
      </div>
      <div className='d-flex inline-flex flex-wrap w-full justify-center mt-4 min-h-screen'>
        <ItemList data={data} />
      </div>
      <div className='my-8 flex gap-4 center justify-center align-center text-center'>
        <button
          disabled={page === 1}
          onClick={previousPage}
          className='disabled:opacity-50 rounded-full bg-red-600 w-16 h-8 font-bold'>{`<`}</button>
        <span>{page}</span>
        <button
          onClick={nextPage}
          className='rounded-full bg-red-600 w-16 h-8 font-bold'>{`>`}</button>
      </div>
    </>
  )
}
export default ItemListContainer
