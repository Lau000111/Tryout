import type { JestConfigWithTsJest } from 'ts-jest'

const jestConfig: JestConfigWithTsJest = {
  presets: ['module:metro-react-native-babel-preset'],
}

export default jestConfig