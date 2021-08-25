import { Card, CardBody, CardText, CardTitle } from 'reactstrap';

const CardDashboard = ({ title, className, titleClassName, countClassName, count = 0 }) => {
  return (
    <Card className={`card-dashboard m-2 w-50 shadow-sm${className ? ` ${className}` : ''}`}>
      <CardBody className="d-flex flex-column flex-start text-start">
        <CardTitle className={`${titleClassName ? ` ${titleClassName}` : ''}`} tag="h5">{title}</CardTitle>
        <CardText
          className={
            `card-count text-end fw-bold${countClassName ? ` ${countClassName}` : ''}`
          }>
          {count}
        </CardText>
      </CardBody>
    </Card>
  )
};

export default CardDashboard;