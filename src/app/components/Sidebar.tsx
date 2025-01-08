import Image from 'next/image'

const TwitterIcon = () => (
  <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const GithubIcon = () => (
  <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
  </svg>
)

const EmailIcon = () => (
  <svg className="w-4 h-4 inline-block mr-1" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
    <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
  </svg>
)

export default function Sidebar() {
  return (
    <aside className="w-64 pr-8">
      <div className="mb-6">
        <Image
          src="/profile.png"
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
            Amazon Bedrock
          </a>
          {' '}working on LLM evaluation tools.
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
              <EmailIcon /> Email
            </a>
          </li>
          <li>
            <a 
              href="https://github.com/jgordley" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              <GithubIcon /> GitHub
            </a>
          </li>
          <li>
            <a 
              href="https://twitter.com/jackgordley" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-600 hover:underline"
            >
              <TwitterIcon /> Twitter
            </a>
          </li>
        </ul>
      </div>
    </aside>
  )
}

