import { EventEmitter } from "events";
import * as Firebase from 'firebase';

/*
 * Created on Fri Jan 17 2020
 *
 * Copyright (c) storycraft. Licensed under the MIT Licence.
 */

export type DatabaseValuePrimitive = string | number | boolean | null;
export type DatabaseValueObject = object;
export type DatabaseValue = DatabaseValuePrimitive | DatabaseValueObject | Array<DatabaseValuePrimitive | DatabaseValueObject>;

export interface Database<K = string, V = DatabaseValue> {

    getEntry(key: K): DatabaseEntry<K, V>;

}

export interface DatabaseEntry<K = string, V = DatabaseValue> {

    readonly EntryName: string;

    getEntry(key: K): Promise<DatabaseEntry<K, V>>;

    has(key: K): Promise<boolean>;

    get(key: K): Promise<V | undefined>;
    set(key: K, value: V): Promise<boolean>;

}


export class FirebaseEntry implements DatabaseEntry<string, DatabaseValue> {

    private document: Firebase.firestore.DocumentReference;
    private snapshot: Firebase.firestore.DocumentSnapshot | null;

    constructor(document: Firebase.firestore.DocumentReference) {
        this.document = document;
        this.snapshot = null;

        this.document.onSnapshot((next) => this.snapshot = next);
    }

    get EntryName() {
        return this.document.id;
    }

    async has(key: string): Promise<boolean> {
        return !!(await this.get(key));
    }

    async getEntry(key: string): Promise<FirebaseEntry> {
        return new FirebaseEntry(this.document.collection('objects').doc(key));
    }

    async get(key: string): Promise<DatabaseValue | undefined> {
        if (!this.snapshot) {
            this.snapshot = await this.document.get();
        }

        let val = this.snapshot.get(key);

        return val;
    }

    async set(key: string, value: DatabaseValue): Promise<boolean> {
        await this.document.set({
            key: value
        }, {
            merge: true
        });

        return true;
    }

}

export class FirebaseDatabase extends FirebaseEntry {

    private collection: Firebase.firestore.CollectionReference;

    constructor(collection: Firebase.firestore.CollectionReference, rootDocument: string) {
        super(collection.doc(rootDocument));

        this.collection = collection;
    }

    get CollectionRef() {
        return this.collection;
    }

}
