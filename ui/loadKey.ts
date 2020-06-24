import { Resource } from "vue-stateful-resource";
import { config } from './config'
import firebase from 'firebase/app'

export async function loadKey(): Promise<Resource<{ key: string }>> {
    try {
        const key = await doLoadKey()
        return Resource.success({ key })
    }
    catch (err) {
        console.error(err);
        return Resource.error<any>(err)
    }
}

async function doLoadKey(): Promise<string> {
    const docPath = config.healthchecksIoKeyFirestorePath
    const docRef = firebase.firestore().doc(docPath)
    const doc = await docRef.get()
    if (!doc.exists) throw new Error(`Missing healthchecks.io key in firestore at '${docPath}'`)
    return doc.get('key')
}