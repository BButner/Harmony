import { mdiCloudPrintOutline, mdiCog, mdiLock } from '@mdi/js'
import { ModelUserSetting, ModelUserSettingCategory } from 'models/user/ModelUserSetting'

export const getIconFromSettingCategory = (category: string): string => {
  switch (category) {
    case "PRIVACY": return mdiLock
    case "MISCELLANEOUS": return mdiCog
    default: return mdiCog
  }
}

export const getUniqueSettingCategories = (categories: ModelUserSettingCategory[]): string[] => {
  return [...new Set(categories.map(category => category.settingCategory))] as string[]
}

interface SettingFromCategory {
  settingName: string;
  settingValue: any;
  settingDescription: string;
  settingNameClean: string;
}

export const getSettingsFromCategory = (selectedCategory: string, categories: ModelUserSettingCategory[], settings: ModelUserSetting): SettingFromCategory[] => {
  const nodes = categories.filter(cat => cat.settingCategory == selectedCategory).map(cat => translateNodeToName(cat.settingName))
  console.log(categories)
  return Object.entries(settings).filter(entry => nodes.includes(entry[0])).map(entry => {
    return { settingName: entry[0],
      settingValue: entry[1],
      settingDescription: categories.filter(cat => translateNodeToName(cat.settingName) === entry[0])[0].description,
      settingNameClean: categories.filter(cat => translateNodeToName(cat.settingName) === entry[0])[0].settingName.replaceAll("_", " ")
    }
  })
}

const translateNodeToName = (settingNode: string): string => {
  return settingNode.replaceAll(/(_[a-z])/g, (res) => { return res.toUpperCase()}).replaceAll("_", "")
}