import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router"
import { CurrentUser } from "../contexts/CurrentUser";
import CommentCard from './CommentCard'
import NewCommentForm from "./NewCommentForm";
import { useNavigate } from "react-router";



function PlaceDetails() {

	const { placeId } = useParams()
	const navigate = useNavigate()
	const { currentUser } = useContext(CurrentUser)

	const [place, setPlace] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(`https://rest-appp.herokuapp.com/places/${placeId}`)
			const resData = await response.json()
			setPlace(resData)
		}
		fetchData()
	}, [placeId])

	if (place === null) {
		return <h1>Loading</h1>
	}

	function editPlace() {
		navigate(`/places/${place.placeId}/edit`)
	}

	async function deletePlace() {
		await fetch(`https://rest-appp.herokuapp.com/places/${place.placeId}`, {
			method: 'DELETE'
		})
		navigate('/places')
	}

	async function deleteComment(deletedComment) {
		await fetch(`https://rest-appp.herokuapp.com/places/${place.placeId}/comments/${deletedComment.commentId}`, {
			method: 'DELETE'
		})

		setPlace({
			...place,
			comments: place.comments
				.filter(comment => comment.commentId !== deletedComment.commentId)
		})
	}

	async function createComment(commentAttributes) {
		const response = await fetch(`https://rest-appp.herokuapp.com/places/${place.placeId}/comments`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(commentAttributes)
		})

		const comment = await response.json()

		setPlace({
			...place,
			comments: [
				...place.comments,
				comment
			]
		})

	}



	let comments = (
		<h3 className="inactive">
			No comments yet!
		</h3>
	)
	let rating = (
		<h3 className="inactive">
			Not yet rated
		</h3>
	)
	if (place.comments.length) {
		let sumRatings = place.comments.reduce((tot, c) => {
			return tot + c.stars
		}, 0)
		let averageRating = Math.round(sumRatings / place.comments.length)
		let stars = ''
		for (let i = 0; i < averageRating; i++) {
			stars += '⭐️'
		}
		rating = (
			<h3>
				{stars} stars
			</h3>
		)
		comments = place.comments.map(comment => {
			return (
				<CommentCard key={comment.commentId} comment={comment} onDelete={() => deleteComment(comment)} />
			)
		})
	}

	let placeActions = null

	if (currentUser?.role === 'admin') {
		placeActions = (
			<>
				<a className="btn btn-warning" onClick={editPlace}>
					Edit
				</a>{` `}
				<button type="submit" className="btn btn-danger" onClick={deletePlace}>
					Delete
				</button>
			</>
		)
	}

	return (
		<main>
			<div className="row">
				<div className="col-sm-6">
					<img style={{ maxWidth: 200 }} src={place.pic} alt={place.name} />
					<h3>
						Located in {place.city}, {place.state}
					</h3>
				</div>
				<div className="col-sm-6">
					<h1>{place.name}</h1>
					<h2>
						Rating
					</h2>
					{rating}
					<br />
					<h2>
						Description
					</h2>
					<h3>
						{place.name} has been serving {place.city}, {place.state} since {place.founded}.
					</h3>
					<h4>
						Serving {place.cuisines}.
					</h4>
					<br />
					{placeActions}
					
					
				</div>
			</div>
			<hr />
			<h2>Comments</h2>
			<div className="row">
				{comments}
			</div>
			<hr />
			<h2>Got Your Own Rant or Rave?</h2>
			<NewCommentForm
				place={place}
				onSubmit={createComment}
			/>
		</main>
	)
}

export default PlaceDetails