import React from 'react'
import { TailSpin } from 'react-loader-spinner'

export const Loading = () => {
  return (
    <div className="d-flex justify-content-center m-5 p-5">
          <TailSpin
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
  )
}
