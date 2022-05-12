interface strKeyObj {
    [key: string]: string | strKeyObj
}

export interface Language extends strKeyObj{
    title: string,
}