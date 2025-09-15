const Card = ({ card }) => {
  const {
    title,
    subtitle,
    description,
    phone,
    email,
    web,
    image,
    address,
  } = card;

    return (
    <div className="card">
        <img src={image?.url} alt={image?.alt} width={200} />
        <h2>{title}</h2>
        <h4>{subtitle}</h4>
        <p>{description}</p>
        <p>{phone} | {email}</p>
        <p>{web}</p>
        <p>
            {address?.street} {address?.houseNumber}, {address?.city}, {address?.country}
        </p>
    </div>
  );
};

export default Card;
