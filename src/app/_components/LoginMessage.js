import Link from "next/link";

function LoginMessage() {
  return (
    <div className='grid bg-primary-800 '>
      <p className='text-center text-xl py-12 self-center'>
        Please <span> </span>
        <Link href='/auth/login' className=' text-accent-500'>
          Login <span>  </span>
        </Link>
        to reserve 
        <br /> this cabin right now
      </p>
    </div>
  );
}

export default LoginMessage;
