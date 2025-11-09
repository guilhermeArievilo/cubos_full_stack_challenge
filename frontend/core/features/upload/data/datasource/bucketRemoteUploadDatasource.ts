export default class BucketRemoteUploadDatasource {

  public async uploadFile(path: string, file: Blob): Promise<void> {
    await fetch(path, {
      method: 'PUT',
      headers: { "Content-Type": file.type },
      body: file,
    })
  }
  
}