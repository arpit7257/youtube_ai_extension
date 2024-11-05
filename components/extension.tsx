import { useExtension } from "contexts/extension-context"
import { getVideoData } from "utils/functions"
import { useEffect, useState } from "react"

import ExtensionActions from "./extension-actions"
import ExtensionPanels from "./extension-panels"

export default function Extension() {
  const {
    setExtensionContainer,
    setExtensionData,
    setExtensionIsOpen,
    setExtensionLoading,
    setExtensionTheme,
    setExtensionVideoId,
    extensionTheme,
    extensionIsOpen,
    extensionVideoId
  } = useExtension()

  const [isOpen, setIsOpen] = useState(extensionIsOpen)

  useEffect(() => {
    const getVideoId = () => {
      return new URLSearchParams(window.location.search).get("v")
    }

    const fetchVideoData = async () => {
      const id = getVideoId()

      if (id && id !== extensionVideoId) {
        setExtensionVideoId(id)
        setExtensionLoading(true)
        const data = await getVideoData(id)
        setExtensionData(data)
        setExtensionLoading(false)
      }
    }

    fetchVideoData()

    const intervalId = setInterval(fetchVideoData, 2000)

    return () => clearInterval(intervalId)
  }, [extensionVideoId])

  useEffect(() => {
    console.log("Fetches Theme ")
    const getCssVariable = (name: string) => {
      const rootStyle = getComputedStyle(document.documentElement)
      return rootStyle.getPropertyValue(name).trim()
    }
    const backgroundColor = getCssVariable("--yt-spec-base-background")

    if (backgroundColor === "#fff") {
      setExtensionTheme("light")
    } else {
      setExtensionTheme("dark")
    }
  }, [])

  if (!extensionTheme) return null

  return (
    <main
      ref={setExtensionContainer}
      className={`antialiased w-full mb-3 z-10 ${extensionTheme}`}>
      <div className="w-full">
        <button
          onClick={() => {
            setIsOpen(!isOpen)
            setExtensionIsOpen(!isOpen)
          }}
          className={`w-full text-left px-4 py-2 ${isOpen ? 'bg-gray-200' : 'bg-gray-100'} rounded-md`}
        >
          Toggle Panel
        </button>
        {isOpen && (
          <div className="w-full h-fit max-h-[500px] border border-zinc-200 rounded-md overflow-auto space-y-3 p-4">
            <ExtensionActions />
            <ExtensionPanels />
          </div>
        )}
      </div>
    </main>
  )
}


