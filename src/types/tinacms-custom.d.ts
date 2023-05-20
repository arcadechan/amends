import { Template } from 'tinacms'
import { PostQuery, PostQueryVariables } from 'tina/__generated__/types'

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

export declare type TinaQueryResponse = {
  data: PostQuery
  variables: PostQueryVariables
  query: string
}
