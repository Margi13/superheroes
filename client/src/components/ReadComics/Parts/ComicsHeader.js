import { titles } from '../../../common/messagesConstantsBG';
import '../ReadComics.css';
import { useEffect, useState } from 'react';

const ComicsHeader = ({
    title,
    data,
}) => {
    const [username, setUsername] = useState('')
	useEffect(()=>{
		if (data._ownerId) {
			setUsername(data._ownerId.email.split('@')[0])
		}
	}, [data])
    return (
        <>
            <section className="comics-header">
                <h1>{titles.Title}: <span>{data.title}</span></h1>
                <h1>{titles.Author}: <span>{username}</span></h1>
            </section>
        </>
    );
}

export default ComicsHeader;