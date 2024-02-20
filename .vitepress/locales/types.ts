interface Info {
  title: string
  desc?: string
}

export interface CustomConfig {
  keyword: string
  description: string
  image: string
  footer: {
    navigation: {
      title: string
      items: {
        text: string
        link: string
      }[]
    }[]
  }
  payment?: Record<
    string,
    {
      name: string
      address: string
    }
  >
}
