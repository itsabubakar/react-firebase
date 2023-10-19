import { useEffect, useState } from "react"
import Auth from "./components/Auth"
import { db, auth, storage } from './config/firebase'
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { ref, uploadBytes } from "firebase/storage"

const App = () => {
  const [book, setBook] = useState(null)
  const [bookTitle, setBookTitle] = useState('')
  const [bookPage, setBookPage] = useState('')
  const [read, setRead] = useState(false)
  const [updatedTitle, setUpdatedTitle] = useState('')
  const [fileUpload, setFileUpload] = useState(null)

  const uploadFile = async (e) => {
    if (!fileUpload) return
    try {
      const fileFolderRef = ref(storage, `projectFiles/${fileUpload.name}`)
      await uploadBytes(fileFolderRef, fileUpload)
      console.log('file uploaded');
    } catch (error) {
      console.log(error);
    }

  }

  const updateTitle = async (id) => {
    const docRef = doc(db, 'books', id)
    try {
      await updateDoc(docRef, {
        title: updatedTitle
      })
      console.log('book updated');
    } catch (error) {
      console.log(error);
    }
  }

  const deleteBook = async (id) => {
    try {
      await deleteDoc(doc(db, 'books', id))
      console.log('book deleted');
      getMovie()
    } catch (error) {
      console.log(error);
    }
  }


  const moviesCollection = collection(db, 'books')

  useEffect(() => {
    getMovie()
  }, [])

  const getMovie = async () => {

    try {
      const data = await getDocs(moviesCollection)
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      console.log(filteredData);
      setBook(filteredData)
    } catch (error) {
      console.log(error);
    }
  }

  const submitBook = async () => {
    try {
      await addDoc(moviesCollection, {
        title: bookTitle,
        pageNo: bookPage,
        read: read,
        userId: auth?.currentUser?.uid
      })
      getMovie()
      console.log('book added');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <h2>Firebase Practise</h2>
      <Auth />

      <div>
        <input onChange={(e) => setBookTitle(e.target.value)} placeholder="Book title" type="text" />
        <input onChange={(e) => setBookPage(e.target.value)} placeholder="pages" type="text" />
        <input onChange={(e) => setRead(e.target.checked)} type="checkbox" checked={read} />
        <label htmlFor="">Read</label>
        <button onClick={submitBook}>submit book</button>
      </div>
      <div>

        <input onChange={(e) => setFileUpload(e.target.files[0])} type="file" />
        <button onClick={uploadFile}>upload</button>
      </div>

      {
        book && book.map((item) => (
          <div key={item.id}>
            <h1 >{item.title}</h1>
            <p>{item.pageNo}</p>
            <button onClick={() => deleteBook(item.id)}>Delete me</button>
            <input onChange={(e) => setUpdatedTitle(e.target.value)} type="text" placeholder="new title" />
            <button onClick={() => updateTitle(item.id)}>Update title</button>
          </div>
        ))
      }

    </div >
  )
}
export default App