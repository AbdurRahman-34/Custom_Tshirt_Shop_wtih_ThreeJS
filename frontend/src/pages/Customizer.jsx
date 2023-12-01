import React, {useState, useEffect} from 'react'; React
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import config  from '../config/config';
import state from '../store';
import {download} from '../assets';
import {downloadCanvasToImage, reader} from '../config/helpers';
import {EditorTabs, FilterTabs, DecalTypes} from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from '../components';
import AiPicker from '../components/AIPicker';



const Customizer = () => {
    const snap = useSnapshot(state)

    // Right bar all state :::
    const [file, setFile] = useState('')
    const [prompt, setprompt] = useState('')
    const [generatingImg, setGeneratingImg] = useState(false)
    const [activeEditiorTab, setActiveEditiorTab] = useState("")
    const [activeFilterTab, setActiveFilterTab] = useState({
        logoShirt : true,
        stylishShirt : false,
    })


    // show tab content depnding on the activetab 
    const genarateTabContent = () => {
        switch(activeEditiorTab) {
            case "colorpicker":
              return <ColorPicker/>
            case "filepicker":
              return <FilePicker
              file={file}
              setFile={setFile}
              readFile={readFile}
              />
            case "aipicker":
              return <AiPicker
                prompt={prompt}
                setprompt={setprompt}
                generatingImg={generatingImg}
                handelSubmit={handelSubmit}
              />
            default:
              return null
          }
    }

    // Ai image generate :::
    const handelSubmit = async (type)=>{
        if(!prompt) return alert("Please enter a prompt");

        try{
            //call our backend to generate an ai image
            setGeneratingImg(true);

            const response = await fetch('https://modern-tshirt-shop.onrender.com/api/v1/dalle',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                prompt,
              })
            })


        const data = await response.json()    
        handleDecals(type, `data:image/png;base64,${data.photo}`)
        } catch (error) {
            alert(error)
        }finally{
            setGeneratingImg(false)
            setActiveEditiorTab("")
        }
    }



    // bottom bar
    const handleDecals = (type, result) => {
        const decalType = DecalTypes[type];
    
        state[decalType.stateProperty] = result;
    
        if(!activeFilterTab[decalType.filterTab]) {
          handleActiveFilterTab(decalType.filterTab)
        }
      }

      const handleActiveFilterTab = (tabName) => {
        switch (tabName) {
          case "logoShirt":
              state.isLogoTexture = !activeFilterTab[tabName];
            break;
          case "stylishShirt":
              state.isFullTexture = !activeFilterTab[tabName];
            break;
          default:
            state.isLogoTexture = true;
            state.isFullTexture = false;
            break;
        }
    
        // after setting the state, activeFilterTab is updated
    
        setActiveFilterTab((prevState) => {
          return {
            ...prevState,
            [tabName]: !prevState[tabName]
          }
        })
      }

    const readFile = (type) => {
        reader(file)
        .then((result) => {
            handleDecals(type, result);
            setActiveEditiorTab("")
        })
    }


    return (
        <AnimatePresence>
            {!snap.intro && (
                <>

                {/* RightBar Area - AI, file, and color picker button */}
                   <motion.div
                   key = "custom"
                   className='absolute top-0 left-0 z-10'
                   {...slideAnimation('left')}
                   >
                    <div className='flex items-center min-h-screen'>
                        <div className='editortabs-container tabs'>
                           {EditorTabs.map((tab) =>(
                            <Tab
                            key={tab.name}
                            tab={tab}
                            handleClick={() => setActiveEditiorTab(tab.name)}
                            />
                           ))}
                           {genarateTabContent()}
                        </div>
                    </div>
                   </motion.div>


                   {/* Go Back Button*/}
                   <motion.div
                   className='absolute z-10 top-5 right-5'
                   {...fadeAnimation}
                   >
                    <CustomButton
                        type="filled"
                        title="Go Back"
                        handelClick={() => state.intro = true}
                        customStyles="w-fit px-4 py-2.5 font-bold text-sm"
                    />
                   </motion.div>


                   {/* bottom bar Area*/}
                   <motion.div
                    className='filtertabs-container'
                    {...slideAnimation('up')}
                   >
                      {FilterTabs.map((tab) =>(
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
    );
};

export default Customizer;