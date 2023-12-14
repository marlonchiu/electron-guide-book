/**
 * This file is loaded via the <script> tag in the index.html file and will
 * be executed in the renderer process for that window. No Node.js APIs are
 * available in this process because `nodeIntegration` is turned off and
 * `contextIsolation` is turned on. Use the contextBridge API in `preload.js`
 * to expose Node.js functionality from the main process.
 */
// 根据 id 获取元素
const domGetById = (id) => document.getElementById(id)

const information = document.getElementById('info')
console.log(information)
information.innerText = `本应用正在使用 Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), 和 Electron (v${versions.electron()})`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // 打印 'pong'
}

func()

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  // document.getElementById('theme-source').innerHTML = 'System'
  domGetById('theme-source').innerHTML = 'System'
})

// 蓝牙设备 -- start
async function getBluetoothList() {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true
  })
  console.log('🚀 ~ file: renderer.js:38 ~ getBluetoothList ~ device:', device)
  domGetById('device-name').innerHTML = device.name || `ID: ${device.id}`
}

domGetById('test-bluetooth').addEventListener('click', getBluetoothList)

function cancelRequest() {
  window.electronAPI.cancelBluetoothRequest()
}

domGetById('cancel-bluetooth').addEventListener('click', cancelRequest)

window.electronAPI.bluetoothPairingRequest((event, details) => {
  const response = {}

  switch (details.pairingKind) {
    case 'confirm': {
      response.confirmed = window.confirm(`Do you want to connect to device ${details.deviceId}?`)
      break
    }
    case 'confirmPin': {
      response.confirmed = window.confirm(
        `Does the pin ${details.pin} match the pin displayed on device ${details.deviceId}?`
      )
      break
    }
    case 'providePin': {
      const pin = window.prompt(`Please provide a pin for ${details.deviceId}.`)
      if (pin) {
        response.pin = pin
        response.confirmed = true
      } else {
        response.confirmed = false
      }
    }
  }

  window.electronAPI.bluetoothPairingResponse(response)
})

// 蓝牙设备 -- end
