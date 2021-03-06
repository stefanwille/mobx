import { IObservableArray, IArrayChange, IArraySplice } from "../types/observablearray"
import { ObservableMap, IMapDidChange } from "../types/observablemap"
import { IObjectDidChange } from "../types/observableobject"
import { IComputedValue } from "../core/computedvalue"

import { IObservableValue, IValueDidChange } from "../types/observablevalue"
import { Lambda } from "../utils/utils"
import { getAdministration } from "../types/type-utils"

export function observe<T>(
    value: IObservableValue<T> | IComputedValue<T>,
    listener: (change: IValueDidChange<T>) => void,
    fireImmediately?: boolean
): Lambda
export function observe<T>(
    observableArray: IObservableArray<T>,
    listener: (change: IArrayChange<T> | IArraySplice<T>) => void,
    fireImmediately?: boolean
): Lambda
export function observe<K, V>(
    observableMap: ObservableMap<K, V>,
    listener: (change: IMapDidChange<K, V>) => void,
    fireImmediately?: boolean
): Lambda
export function observe<K, V>(
    observableMap: ObservableMap<K, V>,
    property: K,
    listener: (change: IValueDidChange<V>) => void,
    fireImmediately?: boolean
): Lambda
export function observe(
    object: Object,
    listener: (change: IObjectDidChange) => void,
    fireImmediately?: boolean
): Lambda
export function observe<T, K extends keyof T>(
    object: T,
    property: K,
    listener: (change: IValueDidChange<T[K]>) => void,
    fireImmediately?: boolean
): Lambda
export function observe(thing, propOrCb?, cbOrFire?, fireImmediately?): Lambda {
    if (typeof cbOrFire === "function")
        return observeObservableProperty(thing, propOrCb, cbOrFire, fireImmediately)
    else return observeObservable(thing, propOrCb, cbOrFire)
}

function observeObservable(thing, listener, fireImmediately: boolean) {
    return getAdministration(thing).observe(listener, fireImmediately)
}

function observeObservableProperty(thing, property, listener, fireImmediately: boolean) {
    return getAdministration(thing, property).observe(listener, fireImmediately)
}
