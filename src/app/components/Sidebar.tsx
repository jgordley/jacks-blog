import Image from 'next/image'

export default function Sidebar() {
  return (
    <aside className="w-64 pr-8">
      <div className="mb-6">
        <Image
          src="/profile.jpg"
          alt="Jack Gordley"
          width={150}
          height={150}
          className="rounded-full"
        />
      </div>

      <h2 className="text-2xl font-bold mb-2">Jack Gordley</h2>

      <div className="text-gray-600 mb-4 space-y-2">
        <p>
          Software Engineer at{' '}
          <a 
            href="https://aws.amazon.com/bedrock/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            AWS Bedrock
          </a>
          {' '}working on LLM evaluation.
        </p>

        <p>
          <a 
            href="https://www.nd.edu/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-blue-600 hover:underline"
          >
            Go Irish 🍀 🏈
          </a>
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">Contact</h3>
        <ul className="space-y-2">
          <li>
            <a 
              href="mailto:jgordley99@gmail.com" 
              className="text-blue-600 hover:underline"
            >
              jgordley99@gmail.com
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/jgordley" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com/jackgordley" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              Twitter
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

