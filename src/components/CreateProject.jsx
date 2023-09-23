import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { createProject } from '../services/blockchain'
import { useGlobalState, setGlobalState } from '../store'

const CreateProject = () => {
  const [createModal] = useGlobalState('createModal')
  const [title, setTitle] = useState('')
  const [size, setSize] = useState('')
  const [crop, setCrop] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState('')
  const [date, setDate] = useState('')
  const [imageURL, setImageURL] = useState('')

  const toTimestamp = (dateStr) => {
    const dateObj = Date.parse(dateStr)
    return dateObj / 1000
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!title || !description || !cost || !date || !imageURL || !size || !crop)
      return

    const params = {
      title,
      size,
      crop,
      description,
      cost,
      expiresAt: toTimestamp(date),
      imageURL,
    }

    await createProject(params)
    toast.success('Project created successfully, will reflect in 30sec.')
    onClose()
  }

  const onClose = () => {
    setGlobalState('createModal', 'scale-0')
    reset()
  }

  const reset = () => {
    setTitle('')
    setCost('')
    setDescription('')
    setImageURL('')
    setDate('')
  }

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen flex
    items-center justify-center bg-black bg-opacity-50
    transform transition-transform duration-300 ${createModal}`}
    >
      <div
        className="bg-white shadow-xl  shadow-black rounded-xl w-11/12 md:w-2/5 max-h-[40rem] overflow-auto p-6"
      >
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className='flex justify-between h-[4rem]'>
          <div className="mt-7">
            <p className="font-semibold text-3xl">Investment Required</p>
            
          </div>

          <div className="flex">
            <div className="rounded-xl ml-[4rem] overflow-hidden h-10000 w-20">
              <img
                src={
                  imageURL ||
                  'https://media.wired.com/photos/5926e64caf95806129f50fde/master/pass/AnkiHP.jpg'
                }
                alt="project title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>
          <button
              onClick={onClose}
              type="button"
              className="border-0 mb-[7rem]  bg-transparent focus:outline-none"
            >
              <FaTimes />
            </button>
          </div>
           <hr className='bg-green-600 border-2 mt-[2rem] border-green-600 mb-[2rem]'/>
          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="title"
              placeholder="Location of Your Land"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
            />
          </div> */}
          <div class="relative mb-5">
            <input
              type="text"
              id="floating_outlined"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Location of Your Land
            </label>
          </div>

          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="size"
              placeholder="Size of Your Land"
              onChange={(e) => setSize(e.target.value)}
              value={size}
              required
            />
          </div> */}
          <div class="relative mb-5">
            <input
              type="text"
              id="floating_outlined"
              onChange={(e) => setSize(e.target.value)}
              value={size}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Size(in Acres) of Land
            </label>
          </div>

          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="crop"
              placeholder="Type of Crop"
              onChange={(e) => setCrop(e.target.value)}
              value={crop}
              required
            />
          </div> */}

          <div class="relative mb-5">
            <input
              type="text"
              id="floating_outlined"
              name="crop"
              onChange={(e) => setCrop(e.target.value)}
              value={crop}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
              Type Of Crop
            </label>
          </div>

          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="cost"
              placeholder="Total investment required (ETH)"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
            />
          </div> */}
           <div class="relative mb-5">
            <input
              type="number"
              step={0.01}
              min={0.01}
              id="floating_outlined"
              name="cost"
              onChange={(e) => setCost(e.target.value)}
              value={cost}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
             Total investment required (ETH)
            </label>
          </div>


          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="date"
              name="date"
              placeholder="Start date of Cultivation"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div> */}
          <div class="relative mb-5">
            <input
              type="date"
              id="floating_outlined"
              name="date"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
             Start Date Of Cultivation
            </label>
          </div>

          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <input
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="Image URL of Your Land"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div> */}

<div class="relative mb-5">
            <input
              type="url"
              id="floating_outlined"
              name="imageURL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
               Image URL of Your Land
            </label>
          </div>

          {/* <div
            className="flex justify-between items-center
          bg-gray-300 rounded-xl mt-5"
          >
            <textarea
              className="block w-full bg-transparent
            border-0 text-sm text-slate-500 focus:outline-none
            focus:ring-0"
              type="text"
              name="description"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            ></textarea>
          </div> */}

<div class="relative mb-5">
            <textarea
              type="url"
              id="floating_outlined"
              name="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
              class="block px-2.5  pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none d focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""></textarea>
            <label
              for="floating_outlined"
              class="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            >
                 Description
            </label>
          </div>

          <button
            type="submit"
            className="inline-block px-6 py-2.5 bg-green-600
            text-white font-medium text-md leading-tight
            rounded-full shadow-md hover:bg-green-700 mt-5"
          >
            Add Requirement
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateProject
