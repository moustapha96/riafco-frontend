import React from 'react'

const Subscriber = () => {
    const [email, setEmail] = React.useState('')
    const [error, setError] = React.useState(null)
    const [success, setSuccess] = React.useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!email) {
            setError('Veuillez entrer votre adresse e-mail')
            return
        }
        setSuccess(true)
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col">
            <label htmlFor="email" className="text-white mb-2">
                Recevez nos dernières actualités et événements de RIAFCO
            </label>
            <input
                type="email"
                id="email"
                className="px-4 py-2 rounded-md bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[var(--riafco-orange)]"
                placeholder="Votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Vous êtes désormais inscrit à notre newsletter !</p>}
            <button
                type="submit"
                className="mt-4 py-2 px-4 rounded-md bg-[var(--riafco-orange)] text-white hover:bg-[var(--riafco-orange-hover)]"
            >
                S'inscrire
            </button>
        </form>
    )
}

export default Subscriber
