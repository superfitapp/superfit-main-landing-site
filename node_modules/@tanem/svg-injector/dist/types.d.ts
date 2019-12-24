export declare type AfterAll = (elementsLoaded: number) => void;
export declare type BeforeEach = (svg: Element) => void;
export declare type Errback = (error: Error | null, svg?: Element) => void;
export declare enum EvalScripts {
    Always = "always",
    Once = "once",
    Never = "never"
}
