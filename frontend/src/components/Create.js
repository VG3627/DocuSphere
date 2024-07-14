import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams, Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { io } from 'socket.io-client';
import { useAuthStore } from '../store';
import Modal from './Modal';

const Create = () => {

  const { id } = useParams();
  const docId = id;


  // const quill = useRef() ;

  // console.log(quill) ;
  // if (!localStorage.getItem(`${docId}`)) {
  //   localStorage.setItem(`${docId}`, JSON.stringify([]));
  // }

  const { user: currUser } = useAuthStore();
  const currUserMail = currUser.email;
  // const currentUser = { email: currUserMail };

  const [isSummaryBoxOpen, setIsSummaryBoxOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [body, setBody] = useState(''); // Initialize with one empty page
  const navigate = useNavigate();

  const [selectedUser, setSelectedUser] = useState('');
  const [permission, setPermission] = useState('read');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const url = process.env.REACT_APP_API_URL;

  const { data } = useFetch(`${url}/user/`)




  const url2 = process.env.REACT_APP_API_URL2;
  const [socket, setSocket] = useState();

  useEffect(() => {
    const socketServer = io(`${url2}`)
    setSocket(socketServer)

    socket && socket.emit('join-and-get-doc', docId);
    socket && socket.on("load-document", (data) => {
      console.log(data);
      const title = data.title;
      const body = data.body;
      setTitle(title);
      setBody(body);
    });

    return () => {

      socketServer.disconnect();
      setSocket(null);
    }



  }, [url2]);











  useEffect(() => {
    if (socket === null) {
      return;
    }

    socket && socket.on('receive-changes', ({ title, body }) => {

      setBody(body);

      setTitle(title);
      // }
    });

    return () => {
      socket && socket.off('receive-changes', ({ title, body }) => {
        // if (field === 'body') {
        setBody(body);
        // } else if (field === 'title') {
        setTitle(title);
        // }
      });
    }
  }, [socket])


  const handleContentChange = (value) => {

    socket.emit('send-changes', { docId, title, body: value });
    setBody(value);
  };

  // Handle title change
  const handleTitleChange = (e) => {

    socket.emit('send-changes', { docId, title: e.target.value, body });
    setTitle(e.target.value);
  };


  useEffect(() => {
    if (socket === null) {
      return;
    }

    const interval = setInterval(() => {
      socket && socket.emit('save-doc', { docId, title, body });

    }, 500)
    return () => {
      clearInterval(interval);
    }
  }, [socket, title, body, docId])



  const [authors, setAuthors] = useState(null);
  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${url}/docs/${docId}`);
      const data = await res.json();

      if (res.ok) {

        setAuthors(data.authors);

      }
    } catch (error) {
      console.log(error);
      navigate('/home');
    }
  };
  useEffect(() => {
    // Fetch authors from backend
    fetchAuthors();
  }, []);





  const check = (authors, userr) => {
    if (authors && authors.find(author => author.userMail === userr.email)) {
      return false;
    }
    return true;
  }


  const handleAddAuthor = async () => {
    console.log(authors, "here");
    // console.log(selectedUser) ;
    if (selectedUser) {
      const user = data.find(user => user._id === selectedUser);
      if (user && check(authors, user)) {

        // console.log(userMail) ;
        const userMail = user.email
        setAuthors([...authors, { userMail, role: permission }]);

        try {
          const res = await fetch(`${url}/docs/${docId}`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${currUser.token}`
              },
              body: JSON.stringify({ user, permission })
            }
          )
          const data = await res.json();
          if (res.ok) {
            console.log(data);
            // addTolocalStorage({userMail,permission});

          }
          else {
            console.log(res);
          }
        } catch (error) {
          console.log(error);
        }


        setSelectedUser('');
        setPermission('read');


      }
    }


  };

  const handleRemoveAuthor = async (userMail) => {
    setAuthors(authors.filter(author => author.userMail !== userMail));

    try {
      const res = await fetch(`${url}/docs/authors/${docId}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${currUser.token}`
          },
          body: JSON.stringify({ userMail })
        }
      );
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem(`${docId}`, JSON.stringify(authors));
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }


  };



  // const handleSave = () => {
  //   // Handle document save logic here
  //   console.log({ title, body});


  // };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDelete = async () => {
    setTitle('');
    setBody('');
    try {
      const res = await fetch(`${url}/docs/${docId}`,
        {
          method: 'DELETE',
          headers: {
            'authorization': `Bearer ${currUser.token}`
          }

        }
      );
      if (res.ok) {

        navigate('/home');
      }
    } catch (error) {
      console.log('error');
    }




    navigate('/');
    return;
  };

  const modules = {
    toolbar: [
      [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
      [{ size: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' },
      { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean'],
      ['code-block']
    ],
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'code-block'
  ];
  const getPermission = () => {

    if (authors != null) {
      // console.log(authors) ;
      for (let i = 0; i < authors.length; i++) {
        if (authors[i].userMail === currUserMail) {
          return authors[i].role;
        }
      }
      return "read";
    }
    return "read";
  }
  const userPermission = getPermission();
  const isReadOnly = userPermission === "read";
  // console.log(isReadOnly) ;
  const isOwner = (authors && currUserMail === authors[0].userMail)

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center">
      <div className="bg-white shadow p-4 fixed w-full top-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <Link className="text-lg font-bold" to="/home">Home</Link>
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              className="w-64 px-3 py-2 border border-gray-300 rounded text-lg font-semibold focus:outline-none"
              placeholder="Document Title"
            />
            {isOwner && (
              <div className="relative flex items-center space-x-2">
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-40 px-3 py-2 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="" disabled>
                    Select User
                  </option>
                  {data &&
                    data.map((user) => (
                      <option key={user._id} value={user._id}>
                        {user.email}
                      </option>
                    ))}
                </select>
                <select
                  value={permission}
                  onChange={(e) => setPermission(e.target.value)}
                  className="w-32 px-3 py-2 border border-gray-300 rounded focus:outline-none"
                >
                  <option value="read">Read-only</option>
                  <option value="edit">Can edit</option>
                </select>
                <button onClick={handleAddAuthor} className="px-3 py-2 bg-green-500 text-white rounded">
                  Add Author
                </button>
              </div>
            )}
            <div className="relative">
              <button onClick={toggleDropdown} className="px-3 py-2 bg-blue-500 text-white rounded">
                View Authors
              </button>
              {isDropdownOpen && (
                <div className="absolute mt-2 w-50 bg-white shadow-lg border border-gray-300 rounded">
                  {authors && authors.length > 0 ? (
                    authors.map(({ userMail, role: permission }) => (
                      <div key={userMail} className="flex justify-between items-center p-2 border-b border-gray-10">
                        {<span>
                          {userMail} - {permission}
                        </span>}
                        {(permission !== "owner") && isOwner && (
                          <button
                            onClick={() => handleRemoveAuthor(userMail)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))
                  ) : (
                    <div className="p-2">No authors added</div>
                  )}
                </div>
              )}
            </div>
            {(
              <>
                <button className="px-3 py-2 bg-blue-500 text-white rounded" onClick={() => setIsSummaryBoxOpen(!isSummaryBoxOpen)}>
                  Summarize Document
                </button>
              </>
            )}
            {isOwner && <button className="text-red-500 hover:text-red-700" onClick={handleDelete}>
              Delete
            </button>}
          </div>
        </div>
      </div>
      <div className="mt-24 w-full flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg w-11/12 md:w-2/3 lg:w-2/3 p-4 mb-8" style={{ height: '323mm' }}>
          <ReactQuill
            value={body}
            // ref = {quill}
            onChange={handleContentChange}
            modules={modules}
            formats={formats}
            className="bg-white"
            style={{ height: '297mm' }} // A4 height
            readOnly={isReadOnly}
            // preserveWhitespace={true}
            preserveWhitespace
          />
          {isSummaryBoxOpen && <Modal onClose={() => setIsSummaryBoxOpen(false)} body={body} />}
        </div>
      </div>
    </div>
  );
};

export default Create;

