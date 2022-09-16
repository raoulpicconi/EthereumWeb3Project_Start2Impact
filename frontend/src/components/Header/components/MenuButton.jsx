function MenuButton({ hiddenMenu, setHiddenMenu, setHiddenPage }) {
  function changeVisibility() {
    if (hiddenMenu == "hidden") {
      setHiddenMenu("")
      setHiddenPage("hidden")
    } else {
      setHiddenMenu("hidden")
      setHiddenPage("")
    }
  }
  return (
    <button
      onClick={() => {
        changeVisibility()
      }}
    >
      <div className="flex flex-col p-2 md:hidden">
        <span className="inline-block w-8 h-1 bg-blue-800 rounded mb-1"></span>
        <span className="inline-block w-8 h-1 bg-blue-800 rounded mb-1"></span>
        <span className="inline-block w-8 h-1 bg-blue-800 rounded mb-1"></span>
      </div>
    </button>
  )
}
export default MenuButton
