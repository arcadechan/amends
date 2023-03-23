import { Template } from 'tinacms'

declare type CustomTemplateField = {
    ui?: {
    name?: string
    component?: string
    direction?: string
    variant?: string
    options?: any[]
  }
}

declare type CustomTemplate = {
  fields: CustomTemplateField[]
}

export declare type CustomTemplateWithExtraFieldUI = Template & CustomTemplate