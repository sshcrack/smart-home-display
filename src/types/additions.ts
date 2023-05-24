export type addPrefix<TKey, TPrefix extends string> = TKey extends string
    ? `${TPrefix}${TKey}`
    : never;

export type removePrefix<TPrefixedKey, TPrefix extends string> = TPrefixedKey extends addPrefix<infer TKey, TPrefix>
    ? TKey
    : '';

export type prefixedValue<TObject extends unknown, TPrefixedKey extends string, TPrefix extends string> = TObject extends { [K in removePrefix<TPrefixedKey, TPrefix>]: infer TValue }
    ? TValue
    : never;


export type addPrefixToObject<TObject extends unknown, TPrefix extends string> = {
    [K in addPrefix<keyof TObject, TPrefix>]: prefixedValue<TObject, K, TPrefix>
}

export type addPrefixUnderscoreToObject<TObject extends unknown, TPrefix extends string> = addPrefixToObject<TObject, `${TPrefix}_`>

export type OptionalKeys<T> = {
    [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T];

export type FlipOptional<T> = (Required<Pick<T, OptionalKeys<T>>> &
    Partial<Omit<T, OptionalKeys<T>>>) extends infer O
    ? { [K in keyof O]: O[K] }
    : never;