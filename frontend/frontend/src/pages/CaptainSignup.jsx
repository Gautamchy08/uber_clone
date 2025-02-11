import React from 'react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const CaptainSignup = () => {
  const [firstName, setfirstName] = useState('')
  const [lastName, setlastName] = useState('')
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [captaindata, setcaptaindata] = useState({})
  useEffect(() => {}, [captaindata])
  const submitHandler = e => {
    e.preventDefault()

    setcaptaindata({
      fullName: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    // console.log(captaindata)
    setemail('')
    setpassword('')
    setfirstName('')
    setlastName('')
  }
  return (
    <div className='p-7 flex flex-col justify-between h-screen'>
      <div className='p-7'>
        <img
          className='w-16 mb-10'
          src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAe1BMVEUAAAD////m5uY5OTmYmJhPT0/c3NxVVVVCQkLp6elhYWGlpaXAwMBzc3N2dnafn5+urq7u7u5sbGyCgoLHx8e2trb39/fIyMjQ0NAgICDY2NiKiopbW1uRkZEUFBSrq6spKSlJSUkzMzMZGRkkJCQLCwuEhIQ3NzcuLi5qsPqzAAALK0lEQVR4nN2d6ZqiOhCGgXZpERVEbNpdu9s593+FB4FAAlmKkEjC92OecQY1r1mrkqo4rn4tDrtwc4y3p/n946X7/LSNj5twd1i84dsdnR8epdd4/udwNY2XX5HOQugi3O8mcz4aofk50IWpgzBK4p8OdEiXdaKDUjlhev5Pgg7p95iqLpBawmDVgw5pGygtk0LCLxV4JeROXbFUEXpHZXiFnp6ikqkhDO6K+V76TJSUTQHhfqIBr9BZweDam3Cx1sb30qp3Y+1J6G218r3kzwYkXPja+XLGXvXYg3Cvt33i2vboj/KE57fxvXR8O2HyVr6XwrcSep9vB3Scf3JDjhSh6vULVPGbCA+XgQAzSVge3Qnj4fgyrbUTet+DAjrOX9fe2JFwMzDfSxOdhNOh6XJ97nURzoZGq9RlwOlAeB2aC9NGB+H7VqEQbdUTDrGK4ekftDMCCSOB53oIAW0qGKE5Ywwu2HgDIvwamoUhkGMVQvh+SwkqiEUFIAyH5uAIMGuICZdDU3AlXsIJCc0GBCCKCE1uooVEDVVAaO4gU+vah9DUaYIUf9LgEpo50bfFnfp5hNHQJQeLt4DjERq4FmWJswznEJpmTfD0kCFUt2f9DvndCU2y6CFizvwswsPQJe4s1oDKIhy6vBJijDYMQjPcht302YXQBMdvd53hhLasZZo6gAllzt0ZISjhsLtLfUTzolII06HL2UOU83AUQouWo21BCIfawlaj9g5qi9Abuow91RpPW4Q2WRQ0/ScitMExw1fTbdMkHLp8CsQnfO9RLj2KeYT2eGZ4WnAI7bLrWfLZhLbPFEgzJuF7DsTq15RFOJYqJKd9nHAsVeg4czrheKqQ6IkYoVkHZvrJpxHuhy6VUi0ohGNYztR6UgiHLpNitQntNypIXVuEttuFTd2ahGOaKgodGoR2e2doWjcIhy6PBpGEu6GLo0EBQag/jPD9OhGEQ5dGi/YYYTB0YbQowQjH2EhRM3XG20jL0TT/0+bdJp6CinB8032hdUX4O3RRdAkRjsMPTJNXEo7NcKp1LQkFDprHZpLryXziVj5R9Off8pUBrju/JBRsa5+EBhY6q7PIX32Ur0w4GVcQirohcj6yT9l8Er8BIjThlL+XE4qWbDYTJjmhyMlmM2GcE4ryqtlM+JETip6ymfCFJ57vrSb0MkJh1IjVhEFGKCyI1YSTjFC45WQ14TYjFKZas5rwkREKH7Ka0Bk/4d4Rb1j0JlxdUy/aR7NgIgwB8DfBwfNmafik5AglLYT7No7jf8LSzxyxj6YfoU9GeiQf7C/aEo9Gm4bNg8rxstHu5WFg8RGnL0fsKu1DOG3HzaWMDK6UnGxkiC46JfNEnlAX4gZNHLEV14OQHt1J+8o/aiQBUUeIMMbCDcWEG0ecuFKWcHNhZcpbtHJpnRhP4tWICFfYjyEmPDps30RfwoAT9tjojZz8VvWiEhHiDV9MuHbEp2hkCbl64O8nwyT25C9TbfwRp9VKiUca3xH7i3oTBusXz5+/xFrtnvL213cc8/H/FmMtEfWjJqHneRGg9I44r3hPQjxKDBsvsQDHqs6iE/aZdWP8pBCGnFmHLJsjjsPrReg1YqiW1f9UWwnV0B8wHvVahAt41rj/HPFv0YewvXu+qv6v/Ifq8VaCiiraruhtNeECglbqx7kJn+lBSFswVeNmuapL2c8mxOfWhF3y/l20EtIPA1atMn91I141hLptbuFVhJ2W9H9aCU/0x9HIkkcBot5G9WmiJp034IqwY+rGm/AJaUJWPDjKmJu3S1RN9EfLHyP3lk2Jb4FKax0yJyusYX6Xf2Xsf6EafpkZiLDbsYqLxrGUfSQXLcjvdTucnHyKTqi6fYywm2X944gz4ssSst2UKG4nBidAPGKE3ZLc3zSuadgh75/1E8DbAZbShJ9K1qV3KiHHaimfyAzFLxhhKE04V2JboCdIQk5IePlEQg1NVkvoA+xDVEPsDQ60TCEJ2WdYLnUdAm9cSaQJ1wAb/wd9DfMJNFxAvYlYWVFewAVX0Uaa8Ajw01TTF3NQSqmEbC8emgPW9eoacMxcjnAD8LVVjh9mpbhUQnado1/kUQe3AHKNyBGGAH9pNaKzpvCYQcgaxC7456FWKi6GHOEO4POuTTpGkasInAYh66NR38ubD4rBEs9acoQzBxLuhIpMf7YOwGnaFvT5ooqYz6FQnxRXohxhBNiZwYZ02vq4MvAoFjA1DQzq1uXsg56l9sQtNkzIEboOZBSry0yZPTHfX4uQNoVWP1dZw5U7huL7zJZ3ixt6IUV4g+wBO/jaqvnxRNLptp8matViBVg1y+rhVkmmxD9LEfoZISQn1Hdd5pSwsMksaTRvIumzfdQ+wsqoqR3eDV8U+vCgB+E5IwQFk+AX2QTIOfE9afjtqf7SWT1K3jBLAptc67XpHlvprWvfaixPmGSEMNccaQPMdkmStvddGD7vffL0p6f1Eg+TJ6ZhPAnC7rydz7dnfEVeVq0U4QxyJgo9KhZ836Jhp3Cvc0LDqRRhfuoLeO8dB5H0ESHCCfsdrYUUJwFp1TllCB85IfSkPsscj77/6IRM04iywGXa+vWqQYZwDTpfWsmnbgiG9VDbJHRWtHcsqI3Gp7bUAxZGIEMY5oQddgHOrRJ/vXbDECF5Cjqfhlqepohp+sctxhmxWJUhnBXnvDu8I1tG4WuYTTE5/nwFuQpb87bLX+zKmRDfCtwHDDd4oTl+Xa63bDg6P8jPBcktCDvGdT1W52sYLo/ws/jz5zIMr+cV5B7dU3xebs6xmuSbp5LQ/LzrslqWhF224+zSrCR0B7xITa9cRGhvsku+VhXhGCO5X6rjD8caQ7qvCQ0IwtKgYolQEI4zPi/ECMfZTPF4/FE207uLE44x5UBCEI6xmbok4fgm/W2D0NY07GylDUIXYtnYpHpfF/1lbCbUpkU4trFm3yYcV3KMequgJhxX7giPQjiqdQ2WwBQjHNOEkVIJhWHr9gi/cgYntO8GJJZSBqGVNwTRRNwaRBCOpSemTMKRDKdk+BBJOA7f8IxDOAojqnFh0Ajvt9jzCc0IMe+j5jWBrXtmbkOXsKcuTaAWoe3TfutofPu+J7uTz7dv66RdcmWz2kcjKIQ270RRDq3Q7s6zN18rLayffmWgraId36ES2pqxlRqAQ7+H1E6vFD0zA+MuWXHeF/P0S0dhENroeFvQUVg3HguzuBkn1kFIFqF1l7LELBAmISvU3FDREp+ICN3b0KXuoJZFASK0abRhjDICQotcb/QkU2JCawZUbqgtl9CSk0RLLgOf0Ipr5OmXxkMJLZgWnwICEaHxi3DmTA8mNBxRCAggNLqhipoojNDg4UYwyIAJjT1rw58muhAa6n6D5dSAERq5gOMt1boTupFpd9FcOIttKULTTmrcweWGExo1MYqnQRlCg8YbYN6ezoRuZMYh1F9oF+xOaMY+PyclrwJCA4ziLi1UhnDoMzdzTvplVYSDxmYAE9j1JBxug5EeLq+D0E2pqXU06w+Yn08J4RAWFcRSUkno7ruExfcX5V4B3YSu671vpXqHZFZRT5h1x/dcyP4vFRdFE+FbGD/kBhhVhK570LsLN+1Vf0oIs/6o75zYqkf/U0iYjatLHfPjZSMzwbekhDBTqnqd4/fsfpVUEWZKgAmnAPoMlVRfLoWEWWsNVURs3JfSsztNSgndVxahfs11m6irvUKqCV+aLeVmkPkG6ALtJB2EL83CdRenzm19VTAxUKWLMNcsOfqiqxp+/GOio+oqaSUsFB2C6+S5Ok0f30Uyo8v3Y3paPSfX4KB0TKHrf2tdhbvi0jdqAAAAAElFTkSuQmCC'
        />

        <form
          onSubmit={e => {
            submitHandler(e)
          }}
        >
          <h3 className='text-base mb-2 font-semibold '>What's your name</h3>
          <div className='flex gap-4 mb-5 '>
            <input
              className='bg-[#EEEEEE] rounded px-2 py-4  w-1/2 border text-base placeholder:text-sm'
              required
              type='text'
              placeholder=' first name'
              value={firstName}
              onChange={e => setfirstName(e.target.value)}
            />
            <input
              className='bg-[#EEEEEE] rounded px-2 py-4 border w-1/2 text-base placeholder:text-sm'
              required
              type='text'
              placeholder=' second name'
              value={lastName}
              onChange={e => setlastName(e.target.value)}
            />
          </div>

          <h3 className='text-base mb-2 font-semibold '>What's your email</h3>
          <input
            className='bg-[#EEEEEE] rounded px-2 py-4 mb-5 border w-full text-lg placeholder:text-base'
            required
            type='email'
            placeholder='email@example.com'
            value={email}
            onChange={e => setemail(e.target.value)}
          />
          <h3 className='text-base mb-2 font-semibold'>Enter password</h3>
          <input
            className='bg-[#EEEEEE] rounded px-2 py-4 mb-5 border w-full text-lg placeholder:text-base'
            required
            type='password'
            placeholder='password'
            value={password}
            onChange={e => setpassword(e.target.value)}
          />
          <button className='bg-[#111]  font-semibold text-white rounded px-2 py-4 mb-5 border w-full text-lg  '>
            Signup
          </button>
          <p className='text-center'>
            Already have an account?{' '}
            <Link to='/captain-Login' className='text-blue-600 font-semibold '>
              Login here
            </Link>
          </p>
        </form>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the Google{' '}
          <span className='underline text-blue-600'>Privacy Policy</span>and
          <span className='underline text-blue-600'>Terms of Service</span>{' '}
          apply.
        </p>
      </div>
    </div>
  )
}

export default CaptainSignup
