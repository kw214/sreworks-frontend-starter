const isWindows = require('is-windows')
import { getRunCmdEnv } from './getRunCmdEnv'

export function runCmd(cmd, _args, fn) {
  const args = _args || []

  if (isWindows()) {
    args.unshift(cmd)
    args.unshift('/c')
    cmd = process.env.ComSpec
  }

  const runner = require('child_process').spawn(cmd, args, {
    // keep color
    stdio: 'inherit',
    env: getRunCmdEnv(),
  })

  runner.on('close', (code) => {
    if (fn) {
      fn(code)
    }
  })
}
