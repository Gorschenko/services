
export enum CourseLevel {
    Base = 'base',
    Middle = 'middle',
    Hard = 'hard',
}

export enum CourseCategory {
    Frontend = 'frontend',
    Backend = 'backend',
    QA = 'qa',
    Devops = 'devops',
}

export enum CourseLanguage {
    Js = 'js',
    Ts = 'ts',
    Node = 'node',
    Nest = 'nest',
    Vue = 'vue',
    React = 'react',
    Angular = 'angular',
}

export interface ICourse {
    _id?: string
    ownerId: string
    name: string
    price: number
    level: CourseLevel
    category: CourseCategory[]
    language: CourseLanguage[]
}