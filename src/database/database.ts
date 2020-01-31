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

    getEntry(key: K): Promise<DatabaseEntry<K, V>>;

}

export interface DatabaseEntry<K = string, V = DatabaseValue> {

    readonly EntryName: string;

    getEntry(key: K): Promise<DatabaseEntry<K, V>>;

    has(key: K): Promise<boolean>;

    get(key: K): Promise<V | undefined>;
    set(key: K, value: V): Promise<boolean>;

}


export class FirebaseEntry implements DatabaseEntry<string, DatabaseValue> {

    private reference: Firebase.database.Reference;
    private snapshot: Firebase.database.DataSnapshot | null;

    constructor(reference: Firebase.database.Reference) {
        this.reference = reference;
        this.snapshot = null;

        this.reference.on('child_changed', (updated) => this.snapshot = updated);
    }

    get EntryName() {
        return this.reference.key;
    }

    async has(key: string): Promise<boolean> {
        return !!(this.snapshot.child(key).exists());
    }

    async getEntry(key: string): Promise<FirebaseEntry> {
        return new FirebaseEntry(this.reference.child(key));
    }

    async get(key: string): Promise<DatabaseValue | undefined> {
        if (!this.snapshot) {
            this.snapshot = await this.reference.once('value');
        }

        let val = this.snapshot.val()[key];

        return val;
    }

    async set(key: string, value: DatabaseValue): Promise<boolean> {
        await this.reference.update({
            key: value
        });

        return true;
    }

}

export class FirebaseDatabase extends FirebaseEntry implements Database {

    private database: Firebase.database.Database;

    constructor(database: Firebase.database.Database) {
        super(database.ref());

        this.database = database;
    }

}
