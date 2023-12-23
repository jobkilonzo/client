import React, {useState, useEffect} from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { useSnapshot } from "valtio"
import state from '../store'
import config from '../config/config'
import {download} from '../assets'
import {downloadCanvasToImage, reader} from '../config/helpers'
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants'
import { fadeAnimation, slideAnimation } from '../config/motion'
import {CustomButton, AIPicker, ColorPicker, FilePicker, Tab} from '../components'
const Customize = () => {
  const snap = useSnapshot(state)

  const [file, setFile] =useState('')
  const [prompt, setPrompt] = useState('')
  const [generatingImg, setGenerateImg] = useState(false)
  const [activeEditorTab, setActiveEditorTab] = useState('')
  const [activeFilterTab, setActiveFilter] = useState({
    logoShirt: true,
    stylishShirt: false
  })

  const generateTabContent = () => {
    switch (activeEditorTab){
      case "colorpicker":
        return <ColorPicker/>
      case "filepicker":
        return <FilePicker
        file={file}
        setFile={setFile}
        readFile = {readFile}
        />
      case "aipicker":
        return <AIPicker
        prompt={prompt}
        setPrompt={setPrompt}
        generatingImg={generatingImg}
        handleSubmit={handleSubmit}
        />
      default:
        return null
    }
  }
  const handleSumit = async(type) => {
    if(!prompt) return alert("Please eneter a prompt")

    try{

    }catch(error){
      alert(error)
    }finally{
      setGenerateImg(false)
      setActiveEditorTab("")
    }
  }
  const handleDecals = (type, result) =>{
    const decalType = DecalTypes[type]

    state[decalType.stateProperty] = result

    if(!activeFilterTab[decalType.FilterTab]){
      handleActiveFilterTab(decalType.filterTab)
    }
  }

  const handleActiveFilterTab = (tabName) => {
    switch (tabName){
      case "logoShirt":
        state.isLogoTexture = !activeFilterTab[tabName]
       break
      case "filepicker":
        state.isFullTexture = !activeFilterTab[tabName]
      default:
        state.isLogoTexture = true
        state.isFullTexture = false
    }
    setActiveFilter((prevState) => {
      return {
        ...prevState,
        [tabName]: !prevState[tabName]
      }
    })
  }

  const readFile = (type)=> {
    reader(file)
    .then((result) => {
      handleDecals(type, result)
      setActiveEditorTab("")
    })
  }
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
        <motion.div
        key="custom"
        className='absolute top-0 left-0 z-10'
        {...slideAnimation('left')}>
          <div className='flex items-center min-h-screen'>
            <div className='editortabs-container tabs'>
              {EditorTabs.map((tab)=> (
                <Tab
                key={tab.name}
                tab={tab}
                handleClick={()=> {setActiveEditorTab(tab.name)}}
                />
              ))}
              {generateTabContent()}
            </div>
          </div>
        </motion.div>
        <motion.div className='absolute z-10 top-5 right-5' {...fadeAnimation}>
          <CustomButton
          type="filled"
          title="Go Back"
          handleClick={() => state.intro = true}
          customStyles="w-fit px-4 py-2.5 font-bold text-sm" 
          />
        </motion.div>
        <motion.div className='filtertabs-container'
        {...slideAnimation('up')}>
          {FilterTabs.map((tab) => (
            <Tab
            key={tab.name}
            tab={tab}
            isFilterTab
            isActiveTab={activeFilterTab[tab.name]}
            handleClick={() => handleActiveFilterTab(tab.name)}
             />
          ))}
        </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default Customize